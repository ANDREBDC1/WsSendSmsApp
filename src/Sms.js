
var admin = require("firebase-admin");

var serviceAccount = require("../src/firebase-storage-sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appenviarsms.firebaseio.com"
});

let db = admin.firestore();

var send = function(originNumber, destinationNumber, message, callback){

    
    var usersRef = db.collection("Users").doc(originNumber)
    usersRef.get().then(doc=>{
        if (!doc.exists) {
            callback(true, "Number no exist..")
            return
        }

        console.log('Document data:', doc.data());
        var user = doc.data();

        var pushToken = user.token;
        //var payload = { OriginNumber: originNumber, DestinationNumber : destinationNumber, Messeger: messeger }
        var payload = {
           data: {
                DestinationNumber: destinationNumber,
                Message: message
              }
          };
          
           var options = {
            priority: "high",
            timeToLive: 60 * 60 *24,
            contentAvailable: true,
          };
        admin.messaging().sendToDevice(pushToken, payload, options)
        .then(function(response) {
            console.log("Successfully sent message:", response);
            callback(false,'')
            
          })
          .catch(function(error) {
            console.log("Error sending message:", error);
            callback(true,'Error sending message:' + error)
            
          });

    }).catch(err => {
        callback(true,"Error getting documents" + err)
    })

    // requestPermission()

    
  
}

module.exports = {send}