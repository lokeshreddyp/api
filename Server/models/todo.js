var mongoose  = require('mongoose');
 // mongoose.Promise = global.Promise;
// mongoose.Promise = require('bluebird');
var Todo = mongoose.model('Todo' , {

text:{
type: String,
required: true
},
completed: {
type: Boolean,
default:false
},
completedAt: {
  type:Number,
  default:null
},
_createdid : {
  //to create cuatom object id
  type : mongoose.Schema.Types.ObjectId,
  required: true
}
});

module.exports = {Todo}
