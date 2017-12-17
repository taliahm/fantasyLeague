const mongoose = require('mongoose');
require('./people-model.js');
require('./user-model.js');

const RuleSchema = new mongoose.Schema({
  ruleName: String,
  points: Number
});

// const PersonSchema = new mongoose.Schema({
//   description: String,
//   personName: String,
// });

const LeagueSchema = new mongoose.Schema({
  name: String,
  description: String,
  rules: [RuleSchema],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
});

module.exports = mongoose.model('League', LeagueSchema);
