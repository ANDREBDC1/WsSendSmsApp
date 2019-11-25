
var admin = require("firebase-admin");

var serviceAccount = require("../src/firebase-storage-sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appenviarsms.firebaseio.com"
});

let db = admin.firestore();

var send = function(originNumber, destinationNumber, messeger, callback){

    
    var usersRef = db.collection("Users").doc(originNumber)
    usersRef.get().then(doc=>{
        if (!doc.exists) {
            callback(true, "Number no exist..")
            return
        }

        console.log('Document data:', doc.data());
        var user = doc.data();
        console.log('Token', user.tokem)
        var pushToken = user.tokem;
        var payload = { OriginNumber: originNumber, DestinationNumber : destinationNumber, Messeger: messeger }
        firebase.messaging().sendToDevice(pushToken, payload, (error) =>{
            if(error){
                callback(true, '');
            }else{
                callback(false, '');
            }
        })

    }).catch(err => {
        callback(true,'Error getting documents' + err)
    })

    // requestPermission()

    
  
}

module.exports = {send}