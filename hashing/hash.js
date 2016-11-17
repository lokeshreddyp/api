const SHA256 = require("crypto-js/sha256");

const jwt = require("jsonwebtoken");

var data = {
  id: 10
};

var token = jwt.sign(data , '123abc');
console.log(`token is ${token}`);

var decode = jwt.verify (token,'123abc');

console.log("decoded is" , decode);
// var message = "hello this is lokesh";
//
// var hashed  = SHA256(message).toString();
//
// console.log(`hashed messsage is ${hashed}`);
//
//
// var data = {
//    id : 4
//
// };
//
// var token = {
//   data : data,
// hashed : SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var newhash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// //man in the middle attack!!
// // token.data.id = 5;
// // token.hashed =  SHA256(JSON.stringify(token.data.id)).toString();
//
//
// if(token.hashed === newhash) {
//   console.log('yesh hashes match ,so data is not chamged');
// }
// else {
//   console.log('hashes doesnot  match so toen is not changed');
// }
