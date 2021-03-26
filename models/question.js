const { Schema, model } = require('mongoose')
/**
 * 
 * questionText which is of type String
   answer which is of type String
   author which is of type String
 */

 const questionSchema = new Schema({
   questionText: String,
   answer: String, 
   author: String,
 })

 module.exports = model('Question', questionSchema)