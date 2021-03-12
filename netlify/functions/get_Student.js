
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()

  let body = JSON.parse(event.body)
  let coach = body.coach
  let studentId = body.student

  let tempVariable = await db.collection('studentData')
                                                        .where('coach','==',coach)
                                                        .where('studentId','==',studentId)
                                                        .get()

  let studentsData = tempVariable.docs
  let student = studentsData[0]
  let studentReturnData = student.data()

  let createdDate = studentReturnData.created.toDate()
      let month = createdDate.getMonth() +1
      let day = createdDate.getDate()
      let year = createdDate.getYear() + 1900
      let hours = createdDate.getHours()
      let minutes = createdDate.getMinutes()
      let shortCreatedDate = `${month}-${day}-${year} @ <i>${hours}:${minutes}</i>`
      
      let assignedDate = studentReturnData.coachTimestamp.toDate()
      let month2 = assignedDate.getMonth() +1
      let day2 = assignedDate.getDate()
      let year2 = assignedDate.getYear() + 1900
      let hours2 = assignedDate.getHours()
      let minutes2 = assignedDate.getMinutes()
      let shortAssignedDate = `${month2}-${day2}-${year2} @ <i>${hours2}:${minutes2}</i>`
  
  studentReturnData.createdShort = shortCreatedDate
  studentReturnData.assignedShort = shortAssignedDate
  
  console.log(student.data())
  

  return {
      statusCode: 200,
      body: JSON.stringify(studentReturnData)
    }
}
