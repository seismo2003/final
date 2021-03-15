  // /.netlify/functions/add_student_data
  let firebase = require('./firebase')

  exports.handler = async function(event) {
    let db = firebase.firestore()
    // console.log(`in check # of students`)
    
    let tempVariable = await db.collection('studentData').orderBy('created').get()
    
    //where('coach', '==', "unassigned")
    let studentData = tempVariable.docs
    let studentArray = []
    for (i = 0; i < studentData.length; i ++) {
      let currentStudent = studentData[i].data()
      let assigned = currentStudent.coach

      if (assigned == "unassigned") {
        
        let date = currentStudent.created.toDate()
        let month = date.getMonth() +1
        let day = date.getDate()
        let year = date.getYear() + 1900
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let shortDate = `${month}-${day}-${year} @ <i>${hours}:${minutes}</i>`
        

        studentArray.push(
            {
              studentPhoto: currentStudent.studentPhoto,
              studentId: currentStudent.studentId,
              studentName: currentStudent.studentName,
              studentEmail: currentStudent.studentEmail,
              program: currentStudent.program,
              company:  currentStudent.company,
              number: currentStudent.number,
              start: currentStudent.start,
              created: shortDate
            }
          )
      }
    }

      return {
        statusCode: 200,
        body: JSON.stringify(studentArray)
      }
  }
