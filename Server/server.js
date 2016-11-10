var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

// var Todo = mongoose.model('Todo' , {
//
// text:{
// type: String
// },
// completed: {
// type: Boolean
// },
// completedAt: {
//   type:Number
// }
// });
//
// var otherTodo = new Todo ({
//   text: 'Dinner Cooked' ,
//   completed : true ,
//   completedAt : 12345
//
// });
//
//
// otherTodo.save().then((docs) =>{
//
//   console.log('hehe' ,docs);
//
// },
//
//  (e) => {
//    console.log('error occured' , e);
//  }
// );


var User  = mongoose.model('User' , {
  email : {
    required : true,
    trim : true,
    type: String,
    minlength : 1
  }
});

var NewUser = new User( {
  email : ' lokesh@gmail.com '
})

NewUser.save().then ( (Userdoc) => {
console.log("New  user object created" , Userdoc);
},
(e) => {
console.log("Error caught",e);
});
