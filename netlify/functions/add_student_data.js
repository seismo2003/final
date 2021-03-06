// /.netlify/functions/add_student_data
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  
  console.log('in student data')
  // console.log(event)
  let body = JSON.parse(event.body)
  let studentId = body.studentId
  let studentName = body.studentName
  let studentEmail = body.studentEmail
  let program = body.program
  let company = body.company
  let number = body.number
  let start = body.start

  let createdStamp = firebase.firestore.FieldValue.serverTimestamp()
  
  let newStudent = {
    studentId: studentId,
    studentName: studentName,
    studentEmail: studentEmail,
    program: program,
    company:  company,
    number: number,
    start: start,
    created: createdStamp
  }

  let newPost = await db.collection('studentData').add(newStudent)
  
    return {
    statusCode: 200,
    // body: JSON.stringify(post)
  }

}