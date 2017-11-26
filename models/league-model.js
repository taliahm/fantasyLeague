const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
  ruleName: String,
  points: Number
});

const PersonSchema = new mongoose.Schema({
  description: String,
  personName: String,
});

const LeagueSchema = new mongoose.Schema({
  name: String,
  description: String,
  // DELETE YOU, you are dead to me/
  numOfEpisodes: Number,
  rules: [RuleSchema],
  people: [PersonSchema],
});

module.exports = mongoose.model('League', LeagueSchema);
