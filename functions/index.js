const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

//// FUNCTIONS FOR POST ////

exports.getAllpost = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        db.collection('post').get()
      .then((data) => {
        let users = [];
        data.forEach((doc) => {
          users.push(doc.data())
        });
        return res.json(users);
      })
      .catch((err) => console.error(err))
    })
  })

  exports.deletepost = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        db.collection('post').doc(req.query.id).delete()
      .then(res.json("post deleted"))
      .catch((err) => console.error(err))
    })
  })

  exports.addpost = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        db.collection('post').doc().set(req.body)
      .then(res.json("post created"))
      .catch((err) => console.error(err))
    })
  })

  exports.editpost = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      fs.collection('users').doc(req.query.id).update(req.body)
      .then(res.json("user update"))
      .catch((err) => console.error(err))
    })
  })

