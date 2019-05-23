//initilizing
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.createExercise = functions.https.onRequest((request, response) => {

  let desc = request.body.description;
  let timd = request.body.is_timed;
  let name = request.body.name;

  let exerciseRef = admin
    .database()
    .ref('/exercises')
    .push({
      description: desc,
      is_timed: timd,
      name: name
    })

  let pushID = exerciseRef.key;
  response.json({
    pushKey: pushID
  })
});

exports.createWorkout = functions.https.onRequest((request,response) => {
  let name = request.body.name;
  let image_A = request.body.image_A;
  let image_B = request.body.image_B;
  let target_gender = request.body.target_gender;
  let estimated_length = request.body.estimated_length;
  let exercises = request.body.exercises;

  let workoutRef = admin
    .database()
    .ref('/workouts')
    .push({
      name: name,
      image_A: image_A,
      image_B: image_B,
      target_gender: target_gender,
      exercises: exercises,
      estimated_length: estimated_length
    })

  let pushID = workoutRef.key;
  response.json({
    pushKey: pushID
  })
});



//Function 1
exports.createUID = functions.https.onRequest((request, response) => {

  let userId = request.body.user_id; //pars "user_id"

  // Generate a reference to a new location and add some data using push()
  //and connect to database

  var newPostRef = admin
    .database()
    .ref('/workout_sessions')
    .push({
      user_id: userId
    })
  let postKey = newPostRef.key;
  response.json({
    session_id: postKey
  })

});

//Functions 2 (Parse and Data Processing)
exports.dataPross = functions.https.onRequest((request, response) => {

  var sessionId = request.body.session_id;
  var storedData = request.body.data;
  var userId = request.body.user_id;
  //var sensorData = request.body.data;

  //First check to see if the data exists
  var newPostRef =
    admin.database().ref("/workout_sessions/" + sessionId)
    .once("value", snapshot => { //once takes snapshot
      if (snapshot.exists()) {
        const userData = snapshot.val(); //null or undefined
        if (userData.data === null || userData.data === undefined) {
          // no data exists so store initial data
          //Store the data in database if it does not already exist

          var newPostRef = admin
            .database()
            .ref('/workout_sessions/' + sessionId)
            .set({
              user_id: userId,
                data: storedData
            })
          response.json({
            alert: 'null'
          })
        } else {
          var differenceData = userData.data;
          var mags = [];
          for (var i = 0; i<differenceData.length;i++) {
            differenceData[i].position.x -= storedData[i].position.x;
            differenceData[i].position.y -= storedData[i].position.y;
            differenceData[i].position.z -= storedData[i].position.z;

            let temp = [differenceData[i].position.x,differenceData[i].position.y,differenceData[i].position.z];
            let temp_mag = calcMagniude(temp);
            mags.push(temp_mag);
          }

          let threshold = 2;
          let net_mag = calcMagniude(mags);
          let alert = net_mag >= threshold;
          response.json({
            magnitude_change: net_mag,
            alert: alert
          })
        }
      } else {
        response.json({
            error: "Nothing in database ya dumb bitch"
          })
      }
    })
});

function calcMagniude(positionData) {
  let num = positionData.length;
  var temp = 0;
  for (var i=0;i<num;i++) {
    temp += positionData[i]*positionData[i];
  }
  return Math.sqrt(temp);
}
