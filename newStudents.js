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
      // console.log(students)
      console.log(students.length)
      if (students.length>0) {
        for (i = 0; i<students.length; i++) {
          printStudent(students[i]) // must create function
        }
      } else {
// print to page: "no unassigned students"
      }
      
    } else {
        document.location.href = 'index.html'
    }

})

async function printStudent(student) {
  
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
      <button class="text-gray-500 bg-green-500 my-4 px-4 mx-4 py-2 rounded"> Contact </button>
    </div>
  </div>
    `
  )
  console.log(
    `student ID is ${student.studentId}`
    )
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