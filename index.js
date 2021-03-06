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
      <div class="sm: flex">
        <div class="w-1/2 text-left">Signed in as <strong>${user.displayName}</strong></div>
        <button class="w-1/2 text-pink-500 underline sign-out text-right">Sign Out</button>
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
      console.log(`is Coach`)
      // stuff that happens when Coach
    } else if (isStudent) {
      document.querySelector('.student-coach').classList.add('hidden')
      console.log(`is Student`)
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

        console.log(newStudent)

        let response = await fetch('/.netlify/functions/add_student_data', {
          method: 'POST',
          body: JSON.stringify(
            newStudent
          )
        })
        if (response) {
          document.querySelector('.main-body').innerHTML = `
          <div class="mb-1">
          Thank you ${user.displayName}, your form has been submitted succesfully. A coach will reach out to you soon!
          </div>`
        }
      
      })
      // stuff that happens when Student
    } else {
      document.querySelector('.student-coach').innerHTML =  `
        <div class="p-3 sm:flex">
          <a href="#" class="sm:w-1/2 coach-button block text-center text-white bg-gray-400 mt-4 px-4 mx-4 py-2 rounded">Coach</a>
          <a href="#" class="sm:w-1/2 student-button block text-center text-white bg-gray-400 mt-4 px-4 mx-4 py-2 rounded">Student</a>
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
