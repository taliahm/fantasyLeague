const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
require('./people-model.js');
require('./league-model.js');

const teamSchema = new mongoose.Schema({
  leagueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League',
  },
  people: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  }],
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  teams: [teamSchema],
  leagues: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League',
  }]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);
