// /.netlify/functions/add_student_data
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  
  let studentId = JSON.parse(event.body)


  let querySnapshot = await db.collection('studentData')
                              .where('studentId', '==', studentId)
                              .get()
  let dataExists = querySnapshot.data()
  
    return {
    statusCode: 200,
    body: JSON.stringify(dataExists)
  }

}