var mongoose = require('mongoose');
var FoodNeed = require('./food_need');

var pantrySchema = new mongoose.Schema({
  source: String,
  site_name: String,
  address: String,
  city: String,
  zipcode: String,
  loc: {type: String, coordinates:[]},
  hours: Array,
  website: String,
  phone: String,
  email: String,
  details: String,
  timestamp: String,
  food_donations_accepted:Boolean,
  cannot_accept: Array,
  food_needs: [FoodNeed],
  volunteer_should_contact:Boolean,
  policies:Array
});

module.exports = mongoose.model('Pantry', pantrySchema);
