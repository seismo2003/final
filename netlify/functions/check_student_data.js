// /.netlify/functions/add_student_data
let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  console.log(`in check`)
  let studentId = event.body


  let tempVariable = await db.collection('studentData')
                              .where('studentId', '==', studentId)
                              .get()
  
  let exists = tempVariable.size
  // console.log(data.created)
  // let dataExists = querySnapshot.data().created
  // console.log(dataExists)
  if (exists == 1) {
    return {
      statusCode: 200,
      body: 'found'
    }
  } else {
    return {    
      statusCode: 404,
      body: 'not found'
    }
  }

}