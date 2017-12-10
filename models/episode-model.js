const mongoose = require('mongoose');
require('./people-model.js');

// const PeopleSchema = new mongoose.Schema({
//   personName: String,
//   description: String,
//   rules: Object,
//   totalPoints: Number,
//   _id: String,
// });

const EpisodeSchema = new mongoose.Schema({
  name: String,
  league: String,
  people: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  }],
});

module.exports = mongoose.model('Episode', EpisodeSchema);
