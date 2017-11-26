const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const League = require('./models/league-model.js');
const Episode = require('./models/episode-model.js');
const Rule = require('./models/rule-model.js');

mongoose.connect('mongodb://localhost/project', {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());

// This serves all files placed in the /public
// directory (where gulp will build all React code)
app.use(express.static('public'));

// Also serve everything from our assets directory (static
// assets that you want to manually include)
app.use(express.static('assets'));

// Include your own logic here (so it has precedence over the wildcard
// route below)
// Get all Leagues
app.get('/api/leagues', (req, res, next) => {
  League.find().then((docs) => {
    res.status(200).send(docs);
  })
  .catch((err) => res.status(500).send(err));
});
// create a new league
app.post('/api/league', (req, res, next) => {
  const leagueModel = new League();
  const league = Object.assign(leagueModel, req.body);
  league.save()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});
// this is for adding people and rules to a league
app.put('/api/league/:id/:key', (req, res, next) => {
  const toUpdate = req.body;
  const key = req.params.key;
  const league = League.findById(req.params.id)
  .then((doc) => {
    const updatedLeague = doc;
    updatedLeague[key].push(toUpdate);
    updatedLeague.save()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((err) => {
        res.status(500).send(err);
      })
  })
});
// find episodes by league id
app.get('/api/episode/:id', (req, res, next) => {
  const leagueId = req.params.id;
  Episode.find({ league: leagueId })
    .then((docs) => {
      res.status(200).send(docs);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

// use for initial episode creation
app.post('/api/episode', (req, res, next) => {
  const episodeModel = new Episode;
  const episode = Object.assign(episodeModel, { people: req.body.people }, {league: req.body.league}, {name: req.body.name});
  episode.save()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

app.put('/api/episode/:id', (req, res, next) => {
  const ruleToSave = req.body.people;
  console.log(ruleToSave);
  // console.log(episodeToSave, 'this is what we are trying to save');
  const episodeToFind = Episode.findById(req.params.id)
    .then((doc) => {
      console.log(doc, 'this should be the episode');
      const currentEpisode = doc;
      currentEpisode.people.push(ruleToSave);
      console.log(currentEpisode, 'this is what we are saving');
      // const episode = Object.assign(episodeModel, { people: [...req.body.people, ...currentEpisode[0].people] }, {league: req.body.league}, {name: req.body.name}, currentEpisode);
      // console.log(currenEpisode, 'you should now have an additional person in you');
      // console.log(episode, 'this is the object assign one');
      currentEpisode.save()
        .then((doc) => {
          console.log('do we get into the save?');
          res.status(200).send(doc);
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

// Get a specific league by ID, you don't use this currently
app.get('/api/league/:id', (req, res, next) => {
  const id = req.params.id;
  const league = League.findById(req.params.id)
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

// This route serves your index.html file (which
// initializes React)
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname,'index.html'));
});

// Start your server, and listen on port 8080.
app.listen(8080, function() {
  console.log("App is now listening on port 8080!");
})
 