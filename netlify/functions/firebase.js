const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyBdsQJDlvUTdLocWHHqDOesWSbxlL0RXeM",
  authDomain: "kiei-finalproject.firebaseapp.com",
  projectId: "kiei-finalproject",
  storageBucket: "kiei-finalproject.appspot.com",
  messagingSenderId: "1077432767587",
  appId: "1:1077432767587:web:b169091c7081c8c3b1d456",
  measurementId: "G-JY5TTQHTPB"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase