const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Schema is used to add custom methods by using mongoose object
var UserSchema = new mongoose.Schema({
  email : {
type: String,
    required : true,
    trim : true,
    minlength : 1,
    maxlength : 40,
    unique : true,
    validate : {
      validator : validator.isEmail,
    message : '{VALUE} is invalid'
  }},

//password
  password : {
    type:String,
    required: true,

    minlength : 6
  },

//tokens
  tokens : [{
    access : {
type :String,
required : true
    },
    token : {
      type :String,
      required : true
    }
  }]
})


UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject  = user.toObject();
  return  _.pick(userObject , ['_id' , 'email']);
};
//for instance method
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id : user._id.toHexString() , access} , 'abc123').toString();
  user.tokens.push({access , token});
  return user.save().then(() => {
    return token;
  });
};
//for model methods .statics is used
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded  = jwt.verify(token , 'abc123');
  } catch(e) {

return Promise.reject();
  }

  return User.findOne({
    '_id' : decoded._id,
    'tokens.access' : 'auth',
    'tokens.token' : token
  })
}

//made for User collection
var User  = mongoose.model('User' , UserSchema);
module.exports  = {User};
