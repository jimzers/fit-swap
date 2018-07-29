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

router.post("/novice/add", (req, res) => {
   //HANDLE NOVICE DATA FORM
   firebase.auth().createUserWithEmailAndPassword("marshall@yahoo.com", "password")
   .then(user => {
      var userID = firebase.auth().currentUser.uid;
      console.log(userID);

      const newNinja = {
         name: "lastName",
         email: "email",
         linkedin: "www.linkedin.com/in/name",
         phone: "phone",
         photo: "imageURL",
         goal: ["fat loss", "muscle tone", "sports"],
         details: ["tennis", "basketball", "physique"],
         location: "111 Howard St, Oakland, CA, 94666",
         gyms: [
            "24 hour fitness",
            "Gold's",
            "Planet Fitness"
         ],
         time: "12pm - 8pm"
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

   res.redirect('results');
});

router.post("/ninja/add", (req, res) => {
   //HANDLE NINJA DATA FORM
   firebase.auth().createUserWithEmailAndPassword("marshall@yahoo.com", "password")
   .then(user => {
      var userID = firebase.auth().currentUser.uid;
      console.log(userID);

      const newNinja = {
         name: "lastName",
         email: "email",
         linkedin: "www.linkedin.com/in/name",
         phone: "phone",
         photo: "imageURL",
         goal: ["fat loss", "muscle tone", "sports"],
         details: ["tennis", "basketball", "physique"],
         location: "111 Howard St, Oakland, CA, 94666",
         gyms: [
            "24 hour fitness",
            "Gold's",
            "Planet Fitness"
         ],
         time: "12pm - 8pm"
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