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
  // console.log(student)
  let studentData = student.data()
  console.log(studentData)
}