var {Todo} = require('./../models/todo');

var {User} = require('./../models/user');
const {mongoose} = require("./../db/mongoose");



var id = '58267d0beb3e0ac86b612ec5';


//find query using promises
Todo.find({
  text : "first data entered postman"
}).then((doc)=> {
  console.log(doc);
}, (e) => {
  console.log('oops you got error' ,e);
}
);

Todo.findOne({_id:id}).then((doc) => {

console.log('Find one query' , doc);
},(e) => {
console.log('Opps got an error for find one query',e);
});

Todo.findByIdAndRemove(id).then((doc) => {

console.log('deletd document' , doc);
},(e) => {
console.log('Opps got an error for find one query',e);
});


User.findById(id).then((doc)=> {
if(!doc) {
  return console.log("id didn't match with any id");
}
console.log("user found",doc);
},(e) => {
console.log("we got an error!!",e);
});
