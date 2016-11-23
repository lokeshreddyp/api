
require('./config/config');

// production -- run app on heroku
// development -- run app locally
// test -- testing the app

var express = require('express');
var _ = require('lodash');
var bodyparser = require('body-parser');
// const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todo.js');
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT;
app.use(bodyparser.json());

//Todo post express route
app.post('/todos' , authenticate,(req,res) => {
  // console.log(req.body);

  var todo = new Todo ({
    text : req.body.text,
    _createdid : req.user._id
  });

todo.save().then((doc) => {
  res.send(doc);
}, (e) => {
  res.status(400).send(e);
});
});



//Todo express route get method
app.get('/todos' ,authenticate,(req,res) => {
Todo.find({_createdid : req.user._id}).then((doc)=> {
  res.send({doc});
}, (e) => {
  res.status(400).send(e);
});
});

//Todo exress route get by id
//getting documents by id in todo collection
app.get('/todos/:id' ,authenticate ,(req,res)=> {
  // var test = req.params.id;
  // console.log("your id is",test);

var getid = req.params.id;
console.log('id is',getid);
  // res.send(req.params);
  // console.log(req.params.id);
  Todo.findOne({
  _id : getid,
_createdid : req.user._id
}).then((doc)=> {
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
app.delete('/todos/delete/:todoid' ,authenticate ,(req,res)=> {
  // var test = req.params.id;
  // console.log("your id is",test);

console.log("hey inside delete!!");
var getid = req.params.todoid;
console.log('id is',getid);
  // res.send(req.params);
  // console.log(req.params.id);
  Todo.findOneAndRemove({
    _id : getid,
    _createdid : req.user._id
  }).then((doc) => {
if(!doc) {
  console.log('document doesnot exist');
}
return  console.log('deletd document' , doc);
  },(e) => {
  console.log('Opps got an error for find one query',e);
  });
});

//express route for update query
app.patch('/todos/update/:id' , authenticate,(req,res)=> {
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

Todo.findOneAndUpdate({_id : getid, _createdid : req.user._id} , {$set : body} , {new : true}).then((doc)=> {
if(!doc) {
  return res.status(404).send();
}
//sjkdvndkgd

  // console.log('updated',doc);
res.send({doc});
console.log('updated',doc);
// console.log(res.send({doc}));
}).catch((e)=> {
res.status(400).send(e);
})
});




//User post method

app.post('/users' , (req,res) => {
var  body   = _.pick(req.body , ['email' , 'password']);
var user = new User(body);
console.log("user is" , user);
user.save().then((user) => {

  return user.generateAuthToken();

  //res.send(user);
}).then((token) => {
res.header('x-auth' ,token).send(user);
}).catch((e) => {
  res.status(400).send(e);
  console.log(e);
});
});

//User get method

app.get('/users' , (req,res)=> {
User.find().then((doc) => {
res.send(doc);
}).catch((e) => {
  res.status(400).send(e);
})
});

//express private route get
app.get('/users/me' , authenticate , (req,res)=> {
  res.send(req.user);
});

//login users
app.post('/users/login' , (req,res) => {
var  body   = _.pick(req.body , ['email' , 'password']);

return user.generateAuthToken().then((token) => {
  res.header('x-auth' ,token).send(user);
})
User.findByCredentials(body.email,body.password).then((user)=> {
res.send(user);
}).catch((e) => {
  console.log(e);
})


// var generatedpassword = "$2a$10$Z9DrNkEPA5LFdcVi/1D6YuXIEzbO4Z98xBwI7h9WiDFbbgmsVKEua";
// //verifying the hashing function..resturns true if both match
// bcrypt.compare(plain, generatedpassword, function(err, res) {
//     // res == true
// console.log(res);
// });

} );

app.delete('users/me/delete' ,authenticate,(req,res) => {
user.removeTokenn(req.token).then((token) => {
  res.status(200).send();
}).catch((e) => {
  res.status(400).send(e);
});
});

app.listen(port,() => {
  console.log(`Serve is rnning on port ${port}`);
});

module.exports = {app};
