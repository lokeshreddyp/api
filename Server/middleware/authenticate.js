var  {User} = require('./../models/user');
const express = require('express');


//express middleware for private route
var authenticate = ((req,res,next) => {
  var token = req.header('x-auth');
User.findByToken(token).then((user) => {
  if(!user) {
    return Promise.reject();
  }
  req.user = user;
  req.token  = token;
  //if we dont use next() code down below will never execute
  next();
}).catch((e) => {
res.status(401).send();
});
});

module.exports = {authenticate};
