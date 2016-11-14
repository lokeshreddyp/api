var express = require('express');
var bodyparser = require('body-parser');


var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todo.js');


var app = express();
const port = process.env.PORT || 3000;
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

//getting documents by id in todo collection
app.get('/todos/:id' ,(req,res)=> {
  // var test = req.params.id;
  // console.log("your id is",test);

var getid = req.params.id;
console.log('id is',getid);
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

//getting documents by text in todo collection
app.get('/todos/:texttodo' ,(req,res)=> {
  // var test = req.params.id;
  // console.log("your id is",test);

var texttodo = req.params.texttodo;

var encoded = encodeURIComponent(texttodo);
  // res.send(req.params);
  // console.log(req.params.id);

console.log('encoded is',encoded);

  Todo.find({text:texttodo}).then((doc)=> {
    if(!doc) {
      console.log("document not found");
    }
  res.send({doc});
  },(e) => {
res.status(404).send();
  })
});



app.listen(port , () => {
  console.log(`Serve is rnning on port  ${port}`);
});

module.exports = {app};
