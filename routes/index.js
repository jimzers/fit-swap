const express = require('express');
const router = express.Router();
var firebase = require("firebase");
var db = firebase.database();

router.get("/", (req, res) => {
   res.render('index');
});

router.get('/ninja', (req, res) => {
   res.render('ninja-form');
});

router.get('/novice', (req, res) => {
   res.render('novice-form');
});

router.get('/agora', (req, res) => {
   res.render('agora');
});

router.post("/novice/add", (req, res) => {
   console.log(req.body);
   //HANDLE NOVICE DATA FORM
   firebase.auth().createUserWithEmailAndPassword(req.body.email, "password")
   .then(user => {
      var userID = firebase.auth().currentUser.uid;
      console.log(userID);

      const newNovice = {
         name: {
            first: req.body.first_name,
            last: req.body.last_name
            },
         email: req.body.email,
         linkedin: req.body.linkedin,
         phone: req.body.phone,
         photo: "https://res.cloudinary.com/skooliesocial/image/upload/v1532122742/users/whitedog593-1532122742701.jpg",
         goal: req.body.goal,
         details: req.body.details,
         importance: req.body.importance,
         location: req.body.location,
         gym: req.body.gym,
         time: req.body.time
      };
      db.ref('novices').child(userID).set(newNovice)
      .catch(err => {
         console.log(err);
      });
   })
   .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
   
   res.redirect('/results');
});

router.post("/ninja/add", (req, res) => {
   console.log(req.body);
   //HANDLE NINJA DATA FORM
   firebase.auth().createUserWithEmailAndPassword(req.body.email, "password")
   .then(user => {
      var userID = firebase.auth().currentUser.uid;
      console.log(userID);

      const newNinja = {
         name: {
            first: req.body.first_name,
            last: req.body.last_name
            },
         email: req.body.email,
         linkedin: req.body.linkedin,
         phone: req.body.phone,
         photo: "https://res.cloudinary.com/skooliesocial/image/upload/v1532122742/users/whitedog593-1532122742701.jpg",
         goal: req.body.goal,
         details: req.body.details,
         location: req.body.location,
         gym: req.body.gym,
         time: req.body.time
      };
      db.ref('ninjas').child(userID).set(newNinja)
      .catch(err => {
         console.log(err);
      });
   })
   .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
   
   res.redirect('/results');
});


module.exports = router;