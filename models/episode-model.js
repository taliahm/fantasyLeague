const mongoose = require('mongoose');
require('./people-model.js');

const EpisodeSchema = new mongoose.Schema({
  name: String,
  league: String,
  people: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  }],
});

module.exports = mongoose.model('Episode', EpisodeSchema);
