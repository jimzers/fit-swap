const firebase = require("firebase"),
      express  = require('express'),
      router   = express.Router(),      
      db = firebase.database(),
      axios = require('axios');

// Index route
router.get("/", (req, res) => {
   res.render('index');
});

// Get form to add ninja
router.get('/ninja', (req, res) => {
   res.render('ninja-form');
});

// Get form to add novice
router.get('/novice', (req, res) => {
   res.render('novice-form');
});

// Get form to display matches
router.get('/results', (req, res) => {
   // Create an array to hold ninja objects  ---NOTE: this is not an array yet
   var ninjas = {};

   // Get ninja objects
   db.ref('ninja').once('value', ninja => {
      
      // Push ninjas to array
      ninjas = ninja.val();  

      // Get the locations of the ninja
      axios.get("http://dev.virtualearth.net/REST/v1/Locations/1%20Microsoft%20Way%20Redmond%20WA%2098052?o=json&key=Arxylcl6DjxfZ6WjZqx09X3ZRATy5amWAmw-ky_GqSBzJ_A1kHWwnqQyJdV-Whcl")
      .then(res => {
         var lat = res.data.resourceSets[0].resources[0].point.coordinates[0];
         var lng = res.data.resourceSets[0].resources[0].point.coordinates[1];

         // Get the distances from the novice
         axios.get("https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins="+lat+","+lng+"&destinations="+37.834133+","+-122.005266+"&travelMode=driving&key=Arxylcl6DjxfZ6WjZqx09X3ZRATy5amWAmw-ky_GqSBzJ_A1kHWwnqQyJdV-Whcl")
         .then(res => {
            console.log("DISTANCE: ", res.data.resourceSets[0].resources[0].results[0].travelDuration, "minutes");
         })
         .catch(err => { console.log("ERROR: ", err); }); 
      }) 
      .catch(err => { console.log(err); }) 

      // Render the results
      res.render('results', {ninjas: ninjas}); 
   });

      



          
});

// Get video chat via agora
router.get('/agora', (req, res) => {
   res.render('agora');
});

// POST new novice to database
router.post("/novice/add", (req, res) => {

   // Create a new user  --BE SURE TO ADD PROPER AUTH LATER
   firebase.auth().createUserWithEmailAndPassword(req.body.email, "password")
   .then(user => {
      
      // Add form data to new object
      const userID = firebase.auth().currentUser.uid;
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

      // Save object to database
      db.ref('novices').child(userID).set(newNovice)
      .catch(err => {
         console.log(err);
      });
   })
   // Handle Errors here.
   .catch(function(error) { 
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });   
   res.redirect('/results');
});

// POST new ninja to database
router.post("/ninja/add", (req, res) => {

   // Create new user  --BE SURE TO ADD AUTH LATER
   firebase.auth().createUserWithEmailAndPassword(req.body.email, "password")
   .then(user => {
      var userID = firebase.auth().currentUser.uid;
      console.log(userID);

      // Add form data to new object
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

      // Save object to database
      db.ref('ninja').child(userID).set(newNinja)
      .catch(err => {
         console.log(err);
      });
   })
   // Handle Errors here.
   .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
   
   res.redirect('/results');
});


module.exports = router;