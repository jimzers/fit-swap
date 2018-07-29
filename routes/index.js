const firebase = require("firebase"),
      express  = require('express'),
      router   = express.Router(),
      db = firebase.database(),
      axios = require('axios');

// Index route
router.get("/", (req, res) => {
   //Check if someone is already signed in 
   if(firebase.auth().currentUser) 
      console.log("SOMEONE IS SIGNED IN! ", firebase.auth().currentUser);
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
   var ninjas = [];
   var User = {};

   // Get the novice we are matching with
  db.ref('novices').child('Vw3flmhruoQZW44FeDqAXQU6gyn2').once('value', novice => {    
      User = novice.val();
      console.log("NOVICE: ", User);
   })
   .catch(err => { console.log(err); }) 

   // Get ninja objects
   db.ref('ninja').once('value', ninja => {
      //console.log(ninja.val());
      
      // Push ninjas to array
      Object.values(ninja.val()).forEach(ninja => {
         ninjas.push(ninja);
      });
      //console.log(ninjas);

      //Match by goal
      for (let index = 0; index < ninjas.length; index++) {
         if(ninjas[index].goal == User.goal) ninjas[index].rating++;      
      }
   
      //Match by details
      for (let index = 0; index < ninjas.length; index++) {
         if(ninjas[index].details == User.details) ninjas[index].rating++;      
      }

      //Match by time
      for (let index = 0; index < ninjas.length; index++) {
         if(ninjas[index].time == User.time) ninjas[index].rating++;      
      }

      //Match by gym
      for (let index = 0; index < ninjas.length; index++) {
         if(ninjas[index].gym == User.gym) ninjas[index].rating++;      
      }
      //Match by skills
      for (let index = 0; index < ninjas.length; index++) {
         ninjas[index].skills.forEach( skill => {
            if(User.skills.includes(skill)) ninjas[index].rating++;
         });        
      }

      //Print ratings
      for (let index = 0; index < ninjas.length; index++) {
         console.log(ninjas[index].name.first+": "+ninjas[index].rating)        
      }

      // Rank by compatibility

      function sortFunction(a, b) {
         if (a.rating === b.rating) {
            return 0;
         }
         else {
            return (a.rating < b.rating) ? 1 : -1;
         }
      }
      var sortedArray = ninjas.sort(sortFunction);

      console.log("SORTED NINJAS: ", sortedArray);
      
      // Render the results
      res.render('results', {ninjas: sortedArray}); 
   });

     
});



function getNoviceLocation (id) {
   return axios.get("http://dev.virtualearth.net/REST/v1/Locations/"+id+"?o=json&key=Arxylcl6DjxfZ6WjZqx09X3ZRATy5amWAmw-ky_GqSBzJ_A1kHWwnqQyJdV-Whcl")
       .then(response => {
         this.response = response.data
         console.log(this.response.resourceSets[0].resources[0].point.coordinates[0]);
         console.log(this.response.resourceSets[0].resources[0].point.coordinates[1]);
         return {
            noviceLat: this.response.resourceSets[0].resources[0].point.coordinates[0],
            noviceLng: this.response.resourceSets[0].resources[0].point.coordinates[1]            
         }
       })
       .catch(err => { console.log(err); }) 
}

         

// Get video chat via agora
router.get('/agora', (req, res) => {
   res.render('agora');
});

// POST new novice to database
router.post("/novice/add", (req, res) => {

   // Create a new user  --BE SURE TO ADD PROPER AUTH LATER
   firebase.auth().createUserWithEmailAndPassword(req.body.email, "password")
   .then(() => {
      console.log(req.body);
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
         time: req.body.time,
         travelTime: req.body.travelTime,
         skills: req.body.skills
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
   .then(() => {
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
         time: req.body.time,
         travelTime: req.body.travelTime,
         skills: req.body.skills
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


  //    //Match by distance

      
   //    // Get the lat and lng for the novice
   //    var noviceLat='';
   //    var noviceLng='';
   //    getNoviceLocation(User.location)
   //    .then(data => {
   //       console.log("DATA: ", data)
         
   //          noviceLat = data.noviceLat;
   //          noviceLng = data.noviceLng;
   //    });
      
   //    //For each ninja...
   //    for (let index = 0; index < ninjas.length; index++) {
   //       // Get the lat/lng of the ninja
   //       axios.get("http://dev.virtualearth.net/REST/v1/Locations/"+ninjas[index].location+"?o=json&key=Arxylcl6DjxfZ6WjZqx09X3ZRATy5amWAmw-ky_GqSBzJ_A1kHWwnqQyJdV-Whcl")
   //       .then(res => {
   //          var lat = res.data.resourceSets[0].resources[0].point.coordinates[0];
   //          var lng = res.data.resourceSets[0].resources[0].point.coordinates[1];

   //          //Get the distance between ninja and novice
   //          console.log(noviceLat, noviceLng);
   //          axios.get("https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins="+lat+","+lng+"&destinations="+noviceLat+","+noviceLng+"&travelMode=driving&key=Arxylcl6DjxfZ6WjZqx09X3ZRATy5amWAmw-ky_GqSBzJ_A1kHWwnqQyJdV-Whcl")
   //          .then(res => {
   //             console.log("DISTANCE: ", res.data.resourceSets[0].resources[0].results[0].travelDuration, "minutes");
   //             ninjas[index].minutes = res.data.resourceSets[0].resources[0].results[0].travelDuration;
   //          })
   //          .catch(err => { console.log("ERROR: ", err); }); 
            
   //       }) 
   //       .catch(err => { console.log(err); }) 

   //       if(ninjas[index].minutes < User.travelTime) ninjas[index].rating++;
   //    }