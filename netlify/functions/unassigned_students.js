  // /.netlify/functions/add_student_data
  let firebase = require('./firebase')

  exports.handler = async function(event) {
    let db = firebase.firestore()
    console.log(`in check # of students`)
    
    let tempVariable = await db.collection('studentData').get()
    
    let studentData = tempVariable.docs
    let studentArray = []
    for (i = 0; i < studentData.length; i ++) {
      let currentStudent = studentData[i].data()
      studentArray.push(
          {
            studentId: currentStudent.studentId,
            studentName: currentStudent.studentName,
            studentEmail: currentStudent.studentEmail,
            program: currentStudent.program,
            company:  currentStudent.company,
            number: currentStudent.number,
            start: currentStudent.start,
            created: currentStudent.createdStamp
          }
        )
    }

      return {
        statusCode: 200,
        body: JSON.stringify(studentArray)
      }
  }
