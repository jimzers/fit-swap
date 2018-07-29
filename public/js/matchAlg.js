var firebase = require("firebase");

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyDkm1KG9gyzQn70FWalWm19OYzGRxxJWoA",
    authDomain: "fitswap-f2c33.firebaseapp.com",
    databaseURL: "https://fitswap-f2c33.firebaseio.com",
    storageBucket: "fitswap-f2c33.appspot.com",
};
firebase.initializeApp(config);

var ninjasArr = [];

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

var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/ninja/').once('value').then(function(snapshot) {
    var ninjas = snapshot.val();

    console.log(ninjas)
    // ...
    });


const noviceDB = firebase.database().ref().child('novices');

noviceName = "Adam Nash";
var requestingNovice = firebase.database().ref('novices').orderByChild('name').equalTo(noviceName).indexOn('value', function (snapshot) {
    console.log(snapshot.val());
});
console.log(requestingNovice);

function sortMatches(noviceName) {
    const dbRef = firebase.database().ref().child('ninja');

    dbRef.on('value', snap => {
        console.log('ninja data stuffs:');
        var ninja_arr = [];
        snap.forEach(ss => {
            console.log(ss.val().details);
            var user = [];

            user.push(ss.val().email);
            user.push(ss.val().goal);
            user.push(ss.val().gym);
            user.push(ss.val().linkedin);
            user.push(ss.val().location);
            user.push(ss.val().name);
            user.push(ss.val().phone);
            user.push(ss.val().photo);
            user.push(ss.val().time);
            user.push(ss.val().details);
            user.push(0);
            ninja_arr.push(user);
        });
        console.log(data);
    });

    const noviceDB = firebase.database().ref().child('novices');

    var requestingNovice = firebase.database().ref('novices').once()
});
console.log(requestingNovice);

novice_info = [];
// make array with user's
/*

email
goal
gym
linkedin
location
name
skills
time
where
details
 */
ninja_arr.forEach(ninja => {
        // if distance (novice_info[5], ninja[5]) < their own choice but hardcode 5) {
        //      add points otherwise make the points negative lol
        for (var i = 0; i < 5; i++)

            if (ninja[i] == novice_info[i]) {
                ninja[10] += 1;
            }
    }
);
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

var sortedArray = ninja_arr.sort(sortFunction);
return sortedArray;

}
