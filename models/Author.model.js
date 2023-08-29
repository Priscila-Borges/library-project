const { Schema, model } = require('mongoose');
 
const authorSchema = new Schema(
  {
    name: String,
    age: Number,
    country: String,    
  }, 
  {
    timestamps: true
  }
);
 
module.exports = model('Author', authorSchema);