const mongoose = require('mongoose');

// rules needs to have an episode id?
const EpisodeSchema = new mongoose.Schema({
  name: String,
  rules: Object,
});

const PersonSchema = new mongoose.Schema({
  personName: String,
  description: String,
  episodes: [EpisodeSchema],
  totalPoints: Number,
  leagueId: String,
});

module.exports = mongoose.model('Person', PersonSchema);
