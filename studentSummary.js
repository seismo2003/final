let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
        let studentId = getClickedStudent(window.location.href)
        let response = await fetch('/.netlify/functions/get_Student', {
            method: 'POST',
            body: JSON.stringify({
              coach: user.uid,
              student: studentId
            }
            )
          })
        let student = await response.json()
        console.log(student)
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