var mongoose = require('mongoose');

var foodNeedSchema = new mongoose.Schema({
  name: String,
  priority: String
});



module.exports = foodNeedSchema;
