var express = require('express');
var _ = require('lodash');
var bodyparser = require('body-parser');
var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todo.js');


var app = express();
const port = process.env.PORT || 3000;
app.use(bodyparser.json());

//Todo post express route
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

//Todo express route get method
app.get('/todos' ,(req,res) => {
Todo.find().then((doc)=> {
  res.send({doc});
}, (e) => {
  res.status(400).send(e);
});
});

//Todo exress route get by id
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

console.log("hi out");

//getting documents by text in todo collection
app.get('/todos/tex/:texttodo' ,(req,res)=> {
  // var test = req.params.id;
  // console.log("your id is",test);
console.log("hi in");
var texttodo = req.params.texttodo;

// var encoded = encodeURIComponent(texttodo);
  // res.send(req.params);
  // console.log(req.params.id);

console.log('encoded is',texttodo);

  Todo.find({text:texttodo}).then((doc)=> {
    if(!doc) {
      console.log("document not found");
    }
  res.send({doc});
  },(e) => {
res.status(404).send();
  })
});


//Todo delete express route
app.delete('/todos/delete/:todoid' ,(req,res)=> {
  // var test = req.params.id;
  // console.log("your id is",test);
console.log("hey inside delete!!");
var getid = req.params.todoid;
console.log('id is',getid);
  // res.send(req.params);
  // console.log(req.params.id);
  Todo.findByIdAndRemove(getid).then((doc) => {
if(!doc) {
  console.log('document doesnot exist');
}
return  console.log('deletd document' , doc);
  },(e) => {
  console.log('Opps got an error for find one query',e);
  });
});

//express route for update query
app.patch('/todos/update/:id' , (req,res)=> {
  console.log("inside update method");
var getid = req.params.id;
var body = _.pick(req.body,['text','completed']);



if(_.isBoolean(body.completed) && body.completed) {
body.completedAt = new Date().getTime();
}
else {
  body.completed = false;
  body.completedAt = null;
}

Todo.findByIdAndUpdate(getid , {$set : body} , {new : true}).then((doc)=> {
if(!doc) {
  return res.status(404).send();
}
  // console.log('updated',doc);
res.send({doc});
console.log('updated',doc);
// console.log(res.send({doc}));
}).catch((e)=> {
res.status(400).send(e);
})
});





app.listen(port,() => {
  console.log('Serve is rnning on port' , port);
});

module.exports = {app};
