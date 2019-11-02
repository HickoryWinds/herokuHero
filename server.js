// dependencies
var express = require('express');
var path = require('path');

// Sets up express app
var app = express();
// set port
var PORT = process.env.PORT || 3000;
// set up data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Star Wars characters data
var characters = [
    {
        routeName: 'yoda',
        name: 'Yoda',
        role: 'Jedi Master',
        age: 900,
        forcePoints: 2000
    },
    {
        routeName: 'darthmaul',
        name: 'Darth Maul',
        role: 'Sith Lord',
        age: 200,
        forcePoints: 1200
    },
    {
        routeName: 'obiwankenobi',
        name: 'Obi Wan Kenobi',
        role: 'Jedi Master',
        age: 55,
        forcePoints: 1350
    }
];

// -------Routes------
// basic route that sends the user first to the AJAX page
// page root
app.get('/', function(req, res){
    // res.sendFile(path.join(__dirname, 'view.html'));
    res.sendFile(path.join(__dirname, 'view.html'));
});
// page /add to add character
app.get('/add', function(req, res){
    // res.sendFile(path.join(__dirname, 'add.html'));
    res.sendFile(path.join(__dirname, 'add.html'));
});
// display all character
app.get('/api/characters', function(req, res) {
    return res.json(characters);
});
// display a single character
app.get('/api/characters/:character', function(req, res){
    // character requested
    var chosen = req.params.character;
    // log to console
    console.log(chosen);
    // loop through array to find requested character object
    for (var i = 0; i < characters.length; i++){
        console.log(chosen);
        console.log(characters[i].routeName);
        console.log(characters[i].routeName === chosen);

        if (chosen === characters[i].routeName){
            return res.json(characters[i]);
        }
    }
    // if requested character not in characters array
    return res.json(false);
});

//-------Create New Character-------
// takes in JSON input
app.post('/api/characters', function(req, res){
    // req.body hosts is equal to the JSON post sent from the user
    // this works because of the body parsing middleware
    var newCharacter = req.body;
    // use a regex pattern to remove spaces from newCharacter
    // see https://www.regexbuddy.com/regex/html
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, '').toLowerCase();
    // log to console
    console.log(newCharacter);
    // add newCharacter to characters array
    characters.push(newCharacter);
    // show new character to user
    res.json(newCharacter);
});

// start server to begin listening
app.listen(PORT, function(){
    console.log('All listening on port ' + PORT);
});
