const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const User = require('./models/user-model.js');
const League = require('./models/league-model.js');
const Episode = require('./models/episode-model.js');
const Person = require('./models/people-model.js');
const Draft = require('./models/draft-model');

// mongoose.connect('mongodb://localhost/project', {
//   useMongoClient: true,
// });
mongoose.connect(process.env.MONGODB_SERVER);
mongoose.Promise = global.Promise;

const app = express();
passport.use(User.createStrategy());
app.use(bodyParser.json());
app.use(session({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: true }));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// This serves all files placed in the /public
// directory (where gulp will build all React code)
app.use(express.static('public'));

// Also serve everything from our assets directory (static
// assets that you want to manually include)
app.use(express.static('assets'));

app.get('/api/me', (req, res) => {
  if (req.user) {
    res.status(200).send(req.user)
  } else {
    res.status(401).json({ message: "Unauthorized."});
  }
});

// passport authenticate checks out the body for us to see what's in there.
app.post('/api/login', passport.authenticate('local'), (req, res) => {
  // passport adds a 'user' property to the request
  res.send(req.user);
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.json('User logged out');
})

app.post('/api/signup', (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({
    name,
    email,
  });
  // passport local mongoose contains register method.
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // logIn is provided by express
      req.logIn(user, (err) => {
        res.status(200).send(user);
      })
    }
  });
})

// Get all Leagues
app.get('/api/leagues', (req, res, next) => {
  League.find().populate('users').exec()
  .then((docs) => {
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

app.post('/api/person', (req, res, next) => {
  const personModel = new Person();
  const personToSave = Object.assign(personModel, req.body);
  personToSave.save()
    .then((doc) => {
      res.send(doc).status(200);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})
// getting people in the league
app.get('/api/person/:leagueId', (req, res, next) => {
  Person.find({ leagueId: req.params.leagueId })
    .then((docs) => {
      res.send(docs).status(200);
    })
    .catch((err) => {
    })
})


app.put('/api/draft/:id', (req, res, next) => {
  console.log('putting');
  const league = League.findById(req.params.id)
    .then((doc) => {
      console.log(doc);
      const updatedLeague = doc;
      updatedLeague.users.push(req.user);
      updatedLeague.save()
        .then((doc) => {
          console.log(req.user);
          const user = User.findById(req.user._id)
            .then((user) => {
              console.log(user);
              const updatedUser = user;
              updatedUser.leagues.push(req.params.id);
              updatedUser.save()
                .then((savedUser) => {
                  console.log(savedUser);
                  res.status(200).send(savedUser);
                })
            })
        })
        .catch(err => {
          console.log(err);
        })
    })
})
// this is for adding rules to a league
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
  Episode.find({ league: leagueId }).populate('people').exec()
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
      const currentEpisode = doc;
      const personId = req.body.people._id;
      const personToUpdate = Person.findById(personId)
        .then((foundPerson) => {
          const personModel = new Person();
          const episodes = { name: currentEpisode.name, rules: req.body.people.rules }
          const personToSave = Object.assign(personModel, foundPerson, { episodes })
          personToSave.save()
          .then((savedPerson) => {
            // send back the current episode to be saved
            res.send(currentEpisode).status(200)
          })
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

app.put('/api/episode/:id', (req, res, next) => {
  const ruleToSave = req.body.people;
  const episodeToFind = Episode.findById(req.params.id)
    .then((doc) => {
      const currentEpisode = doc;
      currentEpisode.people.push(ruleToSave);
      currentEpisode.save()
        .then((savedEpisode) => {
          const episodeToUse = savedEpisode;
          const personId = req.body.people._id;
          const personToUpdate = Person.findById(personId)
            .then((foundPerson) => {
              const personModel = new Person();
              const episodes = { name: episodeToUse.name, rules: req.body.people.rules }
              const personToSave = Object.assign(personModel, foundPerson, { episodes })
              personToSave.save()
              .then((savedPerson) => {
                res.send(savedPerson).status(200)
              })
              .catch(err => console.log(err))
            })
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
  const league = League.findById(req.params.id).populate('users').exec()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});

//Post to drafts
app.post('/api/draft', (req, res, next) => {
  console.log(req.body);
  const draftModel = new Draft;
  const userModel = new User;
  const draftToSave = Object.assign(draftModel, req.body, { userId: req.user._id });
  draftToSave.save()
    .then(savedDraft => {
      User.findById(req.user._id)
        .then((user) => {
          console.log(user);
          const newUser = Object.assign(userModel, user, { teams: { people: req.body.people, leagueId: req.body.leagueId }});
          newUser.save()
          .then((doc) => {
            console.log(doc);
            res.send(doc).status(200);
          })
        })
    })
    .catch((err) => {
      res.send(err).status(400);
    })
})

// This route serves your index.html file (which
// initializes React)
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname,'index.html'));
});

// Start your server, and listen on port 8080.
app.listen(process.env.PORT, function() {
  console.log("App is now listening on port 8080!");
})
 