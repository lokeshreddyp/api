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


app.get('/todos' ,(req,res) => {
Todo.find().then((doc)=> {
  res.send({doc});
}, (e) => {
  res.status(400).send(e);
});
});
app.get('/todos/:id' ,(req,res)=> {
  // var test = req.params.id;
  // console.log("your id is",test);

var getid = req.params.id;
  // res.send(req.params);
  // console.log(req.params.id);
  Todo.findById(getid).then((doc)=> {
    if(!doc) {
      console.log("document not found");
    }
  res.send({doc});
  },(e) => {
res.status(404).send();
  })
});


// app.get('/todos/:texttodo' ,(req,res)=> {
//   // var test = req.params.id;
//   // console.log("your id is",test);
//
// var texttodo = req.params.texttodo;
//   // res.send(req.params);
//   // console.log(req.params.id);
//   Todo.find({getid:texttodo}).then((doc)=> {
//     if(!doc) {
//       console.log("document not found");
//     }
//   res.send({doc});
//   },(e) => {
// res.status(404).send();
//   })
// });



app.listen(3000 , () => {
  console.log("Serve is rnning on port 3000");
});

module.exports = {app};
