const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = require('./config');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: config.firebaseConfig.databaseURL
})

exports.validateqr = functions.https.onRequest((req, res) => {
  if (req.query === undefined || !req.query.hasOwnProperty('id') || req.query.id === '') {
    return res.end('nothing to do here');
  }

  return app.database().ref(`/undangan/${req.query.id}`).update({ hadir: true }).then(val => {
    return res.end('Data berhasil di masukkan!');
  })
    .catch(e => res.end('Data Gagal di masukkan!'));
});