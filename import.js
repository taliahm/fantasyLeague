const mongoose = require('mongoose');
const League = require('./models/league-model.js');

mongoose.connect('mongodb://localhost/project');

const leagues = [
    {
        name: 'The Shawshank Redemption',
        people: [],
        rules: [],
        numOfEpisodes: 19,
        description: 'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.'
    },
    {
        name: 'The Godfather',
        people: [],
        rules: [],
        numOfEpisodes: 2,
        description: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.'
    },
    {
        name: 'Black Mirror',
        people: [],
        rules: [],
        numOfEpisodes: 16,
        description: 'This feature-length special consists of three interwoven stories. In a mysterious and remote snowy outpost, Matt and Potter share a Christmas meal, swapping creepy tales of their earlier lives in the outside world. Matt is a charismatic American trying to bring the reserved, secretive Potter out of his shell. But are both men who they appear to be? A woman gets thrust into a nightmarish world of smart gadgetry. Plus a look at what would happen if you could block people in real life.'
    },
]

// Drop any existing data inside of the movies table
League.remove({}, () => {
    console.log('All movies removed');
});

leagues.forEach((league) => {
    const model = new League();
    Object.assign(model, league);
    model.save((err, doc) => {
        if (err) {
            console.log(err);
        }
        console.log(doc);
    });
    return;
});
