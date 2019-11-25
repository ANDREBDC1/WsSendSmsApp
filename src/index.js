const express = require('express'); //import express 
const bodyParser = require('body-parser');
const sms = require('./Sms');
const app = express();
app.use(bodyParser.json()); //need to parse HTTP request body

app.post('/Send', function (req, res) {
    try{
      
      var originNumber =  req.body.OriginNumber == undefined ? '' : req.body.OriginNumber
      var destinationNumber =  req.body.DestinationNumber == undefined ? '' : req.body.DestinationNumber
      var message = req.body.Message == undefined ? '' : req.body.Message

      sms.send(originNumber, destinationNumber, message,  function(error) {
        if (error) {
          res.send({Error: error, Message:'Erro send messenger...'});
        } 
        else {
          res.send({Error: error, Message:'successfully send messenger...'});
        }
      })

    }catch(ex){
      console.log(ex)
      res.send('Erro API ' + ex)
    }
  })


  var server = app.listen(process.env.PORT || 8090, function () {

    var host = server.address().address;
    var port = server.address().port;
  
    console.log("Example app listening at http://%s:%s", host, port);
  });