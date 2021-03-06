let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
        document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <div class="sm: flex">
        <div class="w-1/2 text-left">Signed in as <strong>${user.displayName}</strong></div>
        <button class="w-1/2 text-pink-500 underline sign-out text-right">Sign Out</button>
      </div>`
    
      let response = await fetch('/.netlify/functions/unassigned_students')
      let students = await response.json()
      console.log(students)
    
    } else {
        document.location.href = 'index.html'
    }

})