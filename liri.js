require("dotenv").config();
var keys = require('./keys.js');
var raw = process.argv[3];
var value = process.argv[3].split(" ").join("+"); 
var action = process.argv[2];
var Spotify = require('node-spotify-api');
console.log("searching for: " +raw);
if(action == 'spotify-this-song') {
var spotify = new Spotify(keys.spotify);
spotify
  .request('https://api.spotify.com/v1/search?q='+ value+ "&type=track&limit=20")
  .then(function(data) {
      var test = JSON.stringify(data, null, 2);
      var results = JSON.parse(test);
      var matched;
      for (x = 0; x <results.tracks.items.length; x++) {
          if (results.tracks.items[x] == raw) {
              console.log("match found");
              console.log(results.tracks.items[x]);
              matched = true;
          } 
      } 
      if(!matched) { console.log("no match found but here's the closest");

    console.log("Track by: " + results.tracks.items[0].artists[0].name);
    console.log("Song Name: " + results.tracks.items[0].name);
    console.log(results.tracks.items[0]);
    }
    // console.log("Here's what I found on spotify");
    // opn(results.artists.items[0].external_urls.spotify);
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
} // end if spotify requested
// console.log(keys);