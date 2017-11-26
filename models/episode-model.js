const mongoose = require('mongoose');


const RuleSchema = new mongoose.Schema({
  personName: String,
  description: String,
  rules: Object,
  _id: String,
});

const EpisodeSchema = new mongoose.Schema({
  name: String,
  league: String,
  people: [RuleSchema],
});

module.exports = mongoose.model('Episode', EpisodeSchema);
// module.exports = mongoose.model('Rule', RuleSchema);
