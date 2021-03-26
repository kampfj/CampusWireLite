const { Schema, model } = require('mongoose')
/** 
  username which is of type String (username is the unique identifier)
  password which is of type String
*/

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

module.exports = model('User', userSchema)