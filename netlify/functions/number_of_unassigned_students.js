// /.netlify/functions/add_student_data
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  console.log(`in check # of students`)
  
  let tempVariable = await db.collection('studentData').get()
  
  let numberOfStudents = tempVariable.size
  // console.log(data.created)
  // let dataExists = querySnapshot.data().created
  // console.log(dataExists)
    return {
      statusCode: 200,
      body: JSON.stringify(numberOfStudents)
    }
}
