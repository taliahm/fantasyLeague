const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
  personName: String,
  instances: String,
  rule: Object,
});

// module.exports = mongoose.model('Episode', EpisodeSchema);
module.exports = mongoose.model('Rule', RuleSchema);
