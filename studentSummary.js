let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
        document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <div class="sm:flex items-center mx-4 my-1 bg-white">
        <div class="w-1/2 text-left flex items-center">
          <div class="mx-2 home"><img src="assets/Vinco_Logo1.webp" alt="Vinco" width="40" height="40"/></div>
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
        let studentId = getClickedStudent(window.location.href)
        let response = await fetch('/.netlify/functions/get_Student', {
            method: 'POST',
            body: JSON.stringify({
              coach: user.uid,
              student: studentId
            })
        })
        let student = await response.json()
        if (student) {
            document.querySelector('.welcome').innerHTML = `
            <div class="sm:flex text-green-500 items-center px-4 mx-4 py-1">
            <div class="sm:w-3/4">You are viewing <strong class="text-gray-600">${student.studentName}</strong>'s profile:</div>
            <div class="sm:w-1/4 text-center text-gray-100 text-md bg-gray-500 hover:bg-gray-600 px-2 py-1 m-auto returnToList rounded"><button>Return to List</button></div>
            </div>
            `
            printStudent(student)
            document.querySelector('.whatsapp').addEventListener('click', function(event) {
                document.location.href = `https://wa.me/1${student.number}`
            })
            document.querySelector('.returnToList').addEventListener('click', function(event) {
                document.location.href = `assignedStudents.html`,'_blank'
            })
        }


    } else {
        document.location.href = 'index.html'
    }
})

function getClickedStudent(address) {
    let pound = "#"
    let poundPosition = address.search(pound)

    let studentId = address.substring(poundPosition+1,)

    return studentId
}


async function printStudent(student) {
    let newNumber = `${student.number.substring(0,3)}-${student.number.substring(3,6)}-${student.number.substring(6,10)}`
    document.querySelector('.main-body').insertAdjacentHTML('beforeend', `
    <div class = "sm:flex text-gray-500 border-2 border-green-500 mt-4 px-4 mx-4 py-2 rounded items-center place-items-center">
      <div class="w-full mr-8 sm:w-1/2">
        <img src="${student.studentPhoto}" class="w-full">
      </div>
      <div class="w-full sm:w-1/2">  
        <div> <strong>Name:</strong> ${student.studentName} </div>
        <div> <strong>e-mail:</strong> ${student.studentEmail} </div>
        <a href="tel:${student.number}" class="text-blue underlined"> <strong>Number:</strong> ${newNumber} </a>
        <div> <strong>Company:</strong> ${student.company} </div>
        <div> <strong>Desired Program:</strong> ${student.program} </div>
        <div> <strong>Registered:</strong> ${student.createdShort} </div>
        <div> <strong>Assigned:</strong> ${student.assignedShort} </div>
      </div>
      <div class="w-full sm:w-1/2 my-1 items-center"> 
        <button hfref="https://api.whatsapp.com/send?phone=${student.number}&text=Hi,%20this%20is%20your%20coach!" class="w-full text-gray-100 text-xl bg-green-500 hover:bg-green-600 px-4 py-2 m-auto whatsapp rounded"> WhatsApp your student! </button>
      </div>
    </div>
      `
)}