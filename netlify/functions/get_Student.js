
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()

  let body = JSON.parse(event.body)
  let coach = body.coach
  let student = body.student

  let tempVariable = await db.collection('studentData')
                                                        .where('coach','==',coach)
                                                        .where('studentId','==',student)
                                                        .get()

  let studentsData = tempVariable.docs
  let student = studentsData[0]
  let studentArray = []

  console.log(student)
  
  
  
  
  
//   for (i = 0; i < studentData.length; i ++) {
//     let currentStudent = studentData[i].data()
//     let studentCoach = currentStudent.coach
   
//       let createdDate = currentStudent.created.toDate()
//       let month = createdDate.getMonth() +1
//       let day = createdDate.getDate()
//       let year = createdDate.getYear() + 1900
//       let hours = createdDate.getHours()
//       let minutes = createdDate.getMinutes()
//       let shortCreatedDate = `${month}-${day}-${year} @ <i>${hours}:${minutes}</i>`
      
//       let assignedDate = currentStudent.coachTimestamp.toDate()
//       let month2 = assignedDate.getMonth() +1
//       let day2 = assignedDate.getDate()
//       let year2 = assignedDate.getYear() + 1900
//       let hours2 = assignedDate.getHours()
//       let minutes2 = assignedDate.getMinutes()
//       let shortAssignedDate = `${month2}-${day2}-${year2} @ <i>${hours2}:${minutes2}</i>`

//       studentArray.push({
//         studentId: currentStudent.studentId,
//         studentName: currentStudent.studentName,
//         studentEmail: currentStudent.studentEmail,
//         program: currentStudent.program,
//         company:  currentStudent.company,
//         number: currentStudent.number,
//         start: currentStudent.start,
//         created: shortCreatedDate,
//         assigned: shortAssignedDate
//       })

//   }

  return {
      statusCode: 200,
      body: JSON.stringify(student)
    }
}
