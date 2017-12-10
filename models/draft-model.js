const mongoose = require('mongoose');
require('./people-model.js');

const DraftSchema = new mongoose.Schema({
  userId: String,
  people: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  }],
});

module.exports = mongoose.model('Draft', DraftSchema);
