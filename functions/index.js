//initilizing
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

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

//Functions 2 (Parse and Processing)
exports.dataPross = functions.https.onRequest((request, response) => {

      var sessionId = request.body.session_id;
      var storedData = request.body.data;
      //var sensorData = request.body.data;

      //First check to see if the data exists

      ref
        .child("workout_sessions")
        .orderByChild("session_id")
        .equalTo(sessionId)
        .once("value", snapshot => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              else {
                //Store the data in database if it does not already exist

                var newPostRef = admin
                  .database()
                  .ref('/workout_sessions/' + user_id)
                  .push({
                    data: storedData
                  })
                  .then(() =>
                    response.json({
                        message: 'Gotem!'
                      }
                    }
                  });

              //compare. Can it send array without giving any names?

              //var second = data[1];
              //var third  = data[2];
              //var fourth = data[3];

              //function to compare arrays

            //   function compare(storedData, sensorData) {
            //     const finalarray = [];
            //
            //     storedData.forEach((e1) => sensorData.forEach((e2) => {
            //       if (e1 === e2) {
            //         finalarray.push(e1)
            //       }
            //     }));
            //     return finalarray;
            //   }
            // })








          //JUNK





          /*const functions = require('firebase-functions');

          //Function to retrieve query parameter (text message), transform it (uppercase)
          //and push it to realtime firebase database.

          //connecting to firebase database
          const admin = require('firebase-admin');
          //initializeApp
          admin.initializeApp();

          //transformation
          const toUpperCase = (string) => string.toUpperCase();

          exports.changeMessage = functions.https.onRequest((request, response) => {
            //const text = request.query.text; //takes text message
            const resp = request.body.name; // GET request use query; POST request body
            const a = request.body.data;

            const a_x = a[0];
            const a_y = a[1];
            const a_z = a[2];

            //connects to the firebase database
            admin
              .database()
              .ref('/messages') // connection under refrense messages
              .push({
                text: resp
              }) //push the text
              // response with a message
              .then(() =>
                response.json({
                  message: 'Gotem!',
                  x: a_x,
                  y: a_y,
                  z: a_z
                }))
              .catch(() => {
                reponse.json({
                  message: 'nvm'
                })
              })
            // admin
            //   .database()
            //   .ref('/messages') // connection under refrense messages
            //   .push({
            //     text: secretText
            //   }) //push the text
            //   // response with a message
            //   .then(() =>
            //     response.json({
            //       message: 'Gotem!',
            //       text
            //     }))
            //   .catch(() => {
            //     reponse.json({
            //       message: 'nvm'
            //     })
            //   })

          })
          */