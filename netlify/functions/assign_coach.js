// /.netlify/functions/add_student_data
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  
  console.log('assigning coach')
  // console.log(event)
  let body = JSON.parse(event.body)
  let coach = body.coach
  let student = body.student

  // console.log(`coach is ${coach}`)
  // console.log(`student is ${student}`)
  let tempVariable = await db.collection('studentData').where('studentId', '==', student).get()
  let tempId = tempVariable.docs[0].id
  let tempTimestamp =  firebase.firestore.FieldValue.serverTimestamp()

  db.collection("studentData").doc(tempId).set({
    coach: coach,
    coachTimestamp: tempTimestamp 
  }, {merge:true})

  
  // let studentId = body.studentId
  // let studentName = body.studentName
  // let studentEmail = body.studentEmail
  // let program = body.program
  // let company = body.company
  // let number = body.number
  // let start = body.start

  // let createdStamp = firebase.firestore.FieldValue.serverTimestamp()
  
  // let newStudent = {
  //   studentId: studentId,
  //   studentName: studentName,
  //   studentEmail: studentEmail,
  //   program: program,
  //   company:  company,
  //   number: number,
  //   start: start,
  //   created: createdStamp,
  //   coach: "unassigned"
  // }

  // let newPost = await db.collection('studentData').add(newStudent)
  
    return {
    statusCode: 200,
    // body: JSON.stringify(post)
  }

}