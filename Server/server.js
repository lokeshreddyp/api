var express = require('express');
var bodyparser = require('body-parser');


var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todo.js');


var app = express();
app.use(bodyparser.json());
app.post('/todos' , (req,res) => {
  // console.log(req.body);

  var todo = new Todo ({
    text : req.body.text
  });


todo.save().then((doc) => {
  res.send(doc);
}, (e) => {
  res.status(400).send(e);
});
});

app.listen(3000 , () => {
  console.log("Serve is rnning on port 3000");
})
