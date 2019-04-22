const mongoose = require('mongoose')


const Schema = mongoose.Schema;

 
const userSchema = new Schema({
  
  name: String,
  password: String,
  
  
});
let users  = mongoose.model('users',userSchema)
module.exports = users;