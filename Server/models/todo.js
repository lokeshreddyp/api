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
}
});

module.exports = {Todo}
