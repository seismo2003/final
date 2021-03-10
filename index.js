let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })
    
    console.log('signed in')
    document.querySelector('.sign-in-or-sign-out').innerHTML = `
    <div class="sm: flex items-center mx-4 mt-2">
    <div class="w-1/2 text-left flex items-center">
      <div class="mx-2 home"><img src="assets/Vinco_Logo1.webp" alt="Vinco"/></div>
      <div class="text-left text-gray-400 text-4xl">Vinco</div>
    </div>

    <div class="w-1/2 text-right">
    <div class="w-full text-gray-600">Signed in as <strong>${user.displayName}</strong>
    <button class="w-full text-gray-600 underline sign-out text-right">Sign Out</button>
    </div>
  </div>`

    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })
    
    let docRef = await db.collection('coaches').doc(`${user.uid}`).get()
    let isCoach = docRef.data()

    let docRef2 = await db.collection('students').doc(`${user.uid}`).get()
    let isStudent = docRef2.data()

    if (isCoach) {
      document.querySelector('.student-coach').classList.add('hidden')
      let temp = await unassignedstudents()
      studentsNotContacted = temp.returnNumber
      let temp2 = await assignedstudents(user.uid)
      let studentsAssigned = temp2.returnNumber
      printCoachPage(studentsNotContacted,studentsAssigned)
      document.querySelector('.unassigned').addEventListener('click', function(event) {
        document.location.href = 'newStudents.html'
      })
      document.querySelector('.assigned').addEventListener('click', function(event) {
        document.location.href = 'assignedStudents.html'
      })
    } else if (isStudent) {
      document.querySelector('.student-coach').classList.add('hidden')

      
      let checkStudentResponse = await fetch('/.netlify/functions/check_student_data', {
        method: 'POST',
        body: user.uid
      })
      // console.log(checkStudentResponse)
      let checkStudent = checkStudentResponse.status

      if(checkStudent == 200)
      {
        document.querySelector('.main-body').innerHTML = `
        <div class="mb-1">
        Thank you <strong>${user.displayName}</strong>, your form has been submitted succesfully. A coach will reach out to you soon!
        </div>`
      } else {
        displaySurvey(user)    

        document.querySelector('form').addEventListener('submit', async function(event) {
          // need to refresh so that form goes away!
          event.preventDefault()
    
          let programText = document.querySelector('#program').value
          let companyText = document.querySelector('#company').value
          let numberText = document.querySelector('#number').value
          let startText = document.querySelector('#start').value

          let newStudent = {
            studentId: user.uid,
            studentName: user.displayName,
            studentEmail: user.email,
            program: programText,
            company:  companyText,
            number: numberText,
            start: startText
          }

          let response = await fetch('/.netlify/functions/add_student_data', {
            method: 'POST',
            body: JSON.stringify(
              newStudent
            )
          })
          if (response) {
            document.querySelector('.main-body').innerHTML = `
            <div class="mb-1">
            Thank you <strong>${user.displayName}</strong>, your form has been submitted succesfully. A coach will reach out to you soon!
            </div>`
          }
          
        })
      }
      // stuff that happens when Student
    } else {
      document.querySelector('.student-coach').innerHTML =  `
        <div class="p-3 sm:flex">
          <a href="#" class="sm:w-1/2 coach-button block text-center text-white text-xl bg-green-500 hover:bg-green-700 mt-4 px-4 mx-4 py-2 rounded">Coach</a>
          <a href="#" class="sm:w-1/2 student-button block text-center text-white text-xl bg-green-500 hover:bg-green-700 mt-4 px-4 mx-4 py-2 rounded">Student</a>
          </div>
      `
      document.querySelector('.coach-button').addEventListener('click', function(event) {
        console.log(`coach button clicked`)
        db.collection('coaches').doc(user.uid).set({
          name: user.displayName,
          email: user.email,
        })
        document.location.href = 'index.html'
      })
      document.querySelector('.student-button').addEventListener('click', function(event) {
        console.log(`student button clicked`)
        db.collection('students').doc(user.uid).set({
          name: user.displayName,
          email: user.email,
        })
        document.location.href = 'index.html'
      })
    }

  } else {
    // Signed out
    console.log('signed out')
    document.querySelector('.welcome').classList.add('hidden')
    document.querySelector('.student-coach').classList.add('hidden')
    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }

})

function displaySurvey(user){
  document.querySelector('.main-body').innerHTML = `
  <div class="mb-1">
  Welcome <strong>${user.displayName}</strong>, please fill out the following survey
  </div>
  <form class="bg-gray-100 p-1 rounded">
  <label for="program">What program would you want to study?</label>
  <p><input class="border-2 w-full mb-2 mt-1 pb-3 rounded" type="text" id="program" name="program"></p>

  <label for="company">What is the name of your <strong>Company</strong>? </label>
  <p><input class="border-2 w-full mb-2 mt-1 pb-3 rounded" type="text" id="company" name="company"> </p>                                 

  <label for="number">What is a good contact <strong>phone number</strong>? </label>
  <p><input class="border-2 w-full mb-2 mt-1 pb-3 rounded" type="text" id="number" name="number"> </p> 

  <label for="start">When would you want to start?</label>
  <p><input class="border-2 w-full mb-2 mt-1 pb-3 rounded" type="text" id="start" name="start"> </p> 

  <button class="bg-green-500 text-white mt-1 px-4 py-2 rounded">Submit Form</button>
  </form>
  `
}

async function printCoachPage(notContacted,Assigned) {
  document.querySelector('.main-body').innerHTML = `
  <div class="p-3 sm:flex">
    <div class="assigned sm:w-1/2 block text-center text-gray-500 border-2 border-green-500 mt-4 px-4 mx-4 py-2 rounded">
      <div>Students Assigned to you:</div>
      <a href=# class="text-green-500 hover:text-green-600 text-3xl">${Assigned}</a>
    </div>
    <div class="unassigned sm:w-1/2 block text-center text-gray-500 border-2 border-green-500 mt-4 px-4 mx-4 py-2 rounded">
      <div>Students Waiting to be Contacted:</div>
      <a href=# class="text-green-500 hover:text-green-600 text-3xl">${notContacted}</a>
    </div>
  `
  
}

async function unassignedstudents() {
  let response = await fetch('/.netlify/functions/unassigned_students')
  let students = await response.json()
  let returnNumber = students.length
  console.log(returnNumber)
    return {
      returnNumber
    }

}


async function assignedstudents(coach) {

  let response = await fetch('/.netlify/functions/assigned_students', {
    method: 'POST',
    body: JSON.stringify({
      coach: coach,
    }
    )
  })
  
  let students = await response.json()
  let returnNumber = students.length

  return {
    returnNumber
  }
}