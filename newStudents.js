let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <div class="sm: flex items-center mx-4 mt-2">
        <div class="w-1/2 text-left flex items-center">
          <div class="mx-2 home"><img href="index.html" src="assets/Vinco_Logo1.webp" alt="Vinco"/></div>
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

      document.querySelector('.home').addEventListener('click', function(event) {
        document.location.href = 'index.html'
      })

    
      let response = await fetch('/.netlify/functions/unassigned_students')
      let students = await response.json()
      if (students.length>0) {
        for (i = 0; i<students.length; i++) {
          printStudent(students[i]) 
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
            document.location.href = 'newStudents.html'
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
  <div class = "sm:flex text-gray-500 border-2 border-green-500 mt-4 px-4 mx-4 py-2 rounded items-center">
    <div class="w-full sm:w-1/2">  
      <div> <strong>Name:</strong> ${student.studentName} </div>
      <div> <strong>e-mail:</strong> ${student.studentEmail} </div>
      <div> <strong>Company:</strong> ${student.company} </div>
      <div> <strong>Desired Program:</strong> ${student.program} </div>
      <div> <strong>Registered:</strong> ${student.created} </div>
    </div>
    <div class="w-full sm:w-1/2 my-1 items-center"> 
      <button class="w-full text-gray-100 text-xl bg-green-500 hover:bg-green-600 px-4 py-2 m-auto rounded contact contact-${student.studentId}"> Assign to me </button>
    </div>
  </div>
    `
  )
  


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