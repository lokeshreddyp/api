const express = require('express');
const request = require('request');
const schedule = require('node-schedule');
var app = express();

app.use(express.static(__dirname + '/public'));

var result ;
var rule = new schedule.RecurrenceRule();
rule.second = 1;
schedule.scheduleJob(rule, function(){
    request({
   
      url: 'https://api.spark.io/v1/devices/43003b000347353138383138/toSendTime?access_token=20c6b264ed1fc8bbf419052fad2108fbfc3261cf',
      json: true
    }, (error, response, body) => {
      if (error) {
        console.log('Unable to connect to  server.');
      }
       else if (response.statusCode === 200) {
        console.log(body.result);
        console.log(body.result, 'The 30th second of the minute.');
result = body.result
      }
    });
    
});



app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
