const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

//overriding user object to get only id and email as response to the user
UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject  = user.toObject();
  return  _.pick(userObject , ['_id' , 'email']);
};

//for instance method
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id : user._id.toHexString() , access} , process.env.JWT_SECRET).toString();
  user.tokens.push({access , token});
  return user.save().then(() => {
    return token;
  });
};


UserSchema.methods.removeTokenn = function(passedtoken) {
  var user = this;
  return user.update ({
    $pull : {
      tokens : {
        token : passedtoken
      }
    }
  })
}
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


UserSchema.statics.findByCredentials = function(email,password) {
var User  = this;

return User.findOne({email}).then((user) => {
  if(!user) {
    return Promise.reject();
  }

  //bcrypt dont use promises so we promise like this
  return new Promise((resolve,reject) => {
    bcrypt.compare(password, user.password, (err, res) =>{
        // res == true
    if(res) {
     resolve(user);
     }
    else {
    reject();
    }
    });
  });
})
}
//before adding to db we need to hash the password
UserSchema.pre('save', function(next) {
  // do stuff
  var user = this;

  if (user.isModified('password'))
  {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            // Store hash in your password DB.
            user.password = hash;
            next();
        });
    });
  }
  else {
 next();
  }
});

//made for User collection
var User  = mongoose.model('User' , UserSchema);
module.exports  = {User};
