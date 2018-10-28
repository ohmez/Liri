require("dotenv").config();
var keys = require('./keys.js');
var opn = require('opn');
var raw = process.argv[3];
var value = process.argv[3].split(" ").join("+"); 
var action = process.argv[2];
var Spotify = require('node-spotify-api');
// end global variables 
console.log("--------------------------");
console.log("searching for: " +raw); // initial message
console.log("--------------------------");
switch(action) {
  case 'spotify-this-song': getSpotified();
  break;
  case 'concert-this': getConcerted();
  break;
  case 'movie-this': //add function();
  break;
  case 'do-what-it-says': //add function();
  break;
  default:
  console.log("here are your command options");
  console.log('spotify-this-song');
  console.log('concert-this');
  console.log('movie-this');
  console.log('do-what-it-says');
};
// end switch for actions

function getConcerted() {

};
function getSpotified() {
var spotify = new Spotify(keys.spotify);
spotify
  .request('https://api.spotify.com/v1/search?q='+ value+ "&type=track&limit=50")
  .then(function(data) {
      var test = JSON.stringify(data, null, 2);
      var results = JSON.parse(test);
      debugger;
      var matched;
      for (x = 0; x <results.tracks.items.length; x++) {
        var song = results.tracks.items;        
            if (song[x].name.toLowerCase() == raw.toLowerCase()) {
              console.log("perfect match found");
              console.log("--------------------------");
              console.log("Track by: " + song[x].artists[0].name);// artists
              console.log("Song Name: " + song[x].name); // song name
              console.log("From the Album: " + song[x].album.name);  // album song is from
              console.log("--------------------------");
              console.log("enjoy");
              opn(song[x].external_urls.spotify); // preview link of song
              matched = true;
                } 
        } 
      if(!matched) { 
        console.log("no match found but here's the closest");
        console.log("--------------------------");
        console.log("Track by: " + song[0].artists[0].name);// artists
        console.log("Song Name: " + song[0].name); // song name
        console.log("From the Album: " + song[0].album.name);  // album song is from
        console.log("--------------------------");
        console.log("enjoy");
        opn(song[0].external_urls.spotify); // preview link of song
      }
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
};// end if spotify requested
// console.log(keys);