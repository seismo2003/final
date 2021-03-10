let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <div class="sm: flex">
        <div class="w-1/3 text-left">Signed in as <strong>${user.displayName}</strong></div>
        <button class="w-1/3 text-white underline home text-center">Home</button>
        <button class="w-1/3 text-pink-500 underline sign-out text-right">Sign Out</button>
      </div>`

      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'index.html'
      })

      document.querySelector('.home').addEventListener('click', function(event) {
        document.location.href = 'index.html'
      })

    
      let response = await fetch('/.netlify/functions/unassigned_students')
      let students = await response.json()
      if (students.length>0) {
        for (i = 0; i<students.length; i++) {
          printStudent(students[i]) 
          console.log(students[i].studentId)
          let currentStudent = students[i]
          document.querySelector(`.contact-${students[i].studentId}`).addEventListener('click', async function(event) {
            // assign student to coach NEEED TO EDIT BELOW
            
            // console.log(currentStudent)
            let response = await fetch('/.netlify/functions/assign_coach', {
              method: 'POST',
              body: JSON.stringify({
                coach: user.uid,
                student: currentStudent.studentId
              }
              )
            })
            console.log('contact button clicked')
          })
        }
        
      
      } else {
        printBlank()
      }
      
    } else {
        document.location.href = 'index.html'
    }

})

async function printStudent(student) {
  
  // let date = 1000*student.created;
  // // Hours part from the timestamp
  // let hours = date.getHours();
  // // Minutes part from the timestamp
  // let minutes = "0" + date.getMinutes();
  // // Seconds part from the timestamp
  // let seconds = "0" + date.getSeconds();

  // // Will display time in 10:30:23 format
  // let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  // let date = student.created.toDate()


  document.querySelector('.main-body').insertAdjacentHTML('beforeend', `
  <div class = "sm:flex text-gray-500 border-2 border-green-500 mt-4 px-4 mx-4 py-2 rounded">
    <div class="w-1/2">  
      <div> <strong>Name:</strong> ${student.studentName} </div>
      <div> <strong>e-mail:</strong> ${student.studentEmail} </div>
      <div> <strong>Company:</strong> ${student.company} </div>
      <div> <strong>Desired Program:</strong> ${student.program} </div>
      <div> <strong>Registered:</strong> ${student.created} </div>
    </div>
    <div class="w-1/2"> 
      <button class="text-gray-500 bg-green-500 my-4 px-4 mx-4 py-2 rounded contact contact-${student.studentId}"> Contact </button>
    </div>
  </div>
    `
  )
  
  // console.log(
  //   `shortDate is ${student.shortDate}`
  //   )
  let studentData = student
  // studentId: currentStudent.studentId,
  // studentName: currentStudent.studentName,
  // studentEmail: currentStudent.studentEmail,
  // program: currentStudent.program,
  // company:  currentStudent.company,
  // number: currentStudent.number,
  // start: currentStudent.start,
  // created: currentStudent.createdStamp

}

function printBlank() {
  document.querySelector('.main-body').insertAdjacentHTML('beforeend', `
  <div class = "sm:flex text-gray-500 border-2 border-green-500 mt-4 px-4 mx-4 pt-10 pb-6 rounded">
    <div class="w-full text-center text-3xl">  
      <div> There are currently <strong>no students</strong> waiting to be unassigned </div>
      <div class="text-lg mt-2"> Come back at a later time for newly registered students! </div>
     
    </div>

  </div>
    `
  )
}