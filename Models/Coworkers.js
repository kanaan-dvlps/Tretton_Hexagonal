const mongoose = require('mongoose');

const CoworkersSchema = new mongoose.Schema({
  id: { type: String },
  name: {type: String}, 
  country: {type: String},
  city: {type: String},
  text: {type: String},
  imagePortraitUrl: {type: String},
  imageFullUrl: {type: String},
});

CoworkersSchema.index({
  name: 1,
  country: 1,
  city: 1
});
const Coworker = new mongoose.model('Coworker', CoworkersSchema);
module.exports = Coworker;