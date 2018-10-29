require("dotenv").config();
var keys = require('./keys.js');
var opn = require('opn');
var request = require('request');
var moment = require('moment');
var fs = require('fs');
if(process.argv[3]) {
  var raw = process.argv[3];
  var value = process.argv[3].split(" ").join("+");
}
var file = 'random.txt';
var format = 'utf8';
var action = process.argv[2];
var Spotify = require('node-spotify-api');


// end global variables 

switch(action) {
  case 'spotify-this-song': 
  if(!process.argv[3]) { var value = 'Bohemian+Rhapsody+artist:queen'; var raw = 'Bohemian Rhapsody' } 
  start(raw);
  getSpotified(value,raw);
  break;
  case 'concert-this':
  if(!process.argv[3]) { var value = 'Maroon5'; var raw = 'Maroon5' } 
  start(raw);
  getConcerted(value);
  break;
  case 'movie-this':
  if(!process.argv[3]) { var value = 'The+Fountain'; var raw = 'The Fountain' } 
  start(raw);
  getMovied(value);
  break;
  case 'do-what-it-says': getSome();
  break;
  default:
  console.log("here are your command options:");
  console.log('Please use command followed by a space then your request inside " "s');
  console.log('spotify-this-song "song name"');
  console.log('concert-this "band name"');
  console.log('movie-this "movie name"');
  console.log('do-what-it-says' + ' no additional input needed, edit random.txt file to change, format must remain the same');
  console.log('Format:');
  console.log('* pick-this-command,"pick this value"');
};// end switch check 

function getSome() {
fs.readFile(file, format,(err,data) => {
  if(err) throw err;
  data = data.slice(2);
  data = data.split(",");
  action = data[0];
  raw = JSON.parse(data[1]);
  value = JSON.parse(data[1].split(" ").join("+"));
  switch(action) {
    case 'spotify-this-song': 
    if(!data[1]) { var value = 'Bohemian+Rhapsody'; var raw = 'Bohemian Rhapsody' } 
    start(raw);
    getSpotified(value, raw);
    break;
    case 'concert-this':
    console.log(!value);
    if(!value) { var value = 'Maroon5'; var raw = 'Maroon5' } 
    start(raw);
    getConcerted(value);
    break;
    case 'movie-this':
    if(!data[1]) { var value = 'The+Fountain'; var raw = 'The Fountain' } 
    start(raw);
    getMovied(value);
    break;
  }
  // console.log(data);
});

};// end getSome function, reads random.txt for commands. 

function start(raw) {
  console.log("--------------------------");
  console.log("--------------------------");
  console.log("searching for: " +raw); // initial message
  console.log("--------------------------");
};// end start function, runs in all cases. 

function getMovied(value) {
request('http://www.omdbapi.com/?t='+value+'&apikey=trilogy', function (error, response,body) {
  if(error && response.statusCode !== 200 ) {console.log('error:', error);} // Print the error if one occurred
  if(response.statusCode !== 200) {console.log('statusCode:', response && response.statusCode);}
  else { 
    var results = JSON.parse(body);
    // console.log(results);
    console.log("Movie Title: "+ results.Title);
    console.log("Year Released: "+ results.Year);
    console.log("IMDB Rating: "+results.imdbRating);
    console.log("Rotten Tomatoes Rating: "+results.Ratings[1].Value);
    console.log("Produced in: "+results.Country);
    console.log("Movie Language: "+results.Language);
    console.log("Movie Plot: "+results.Plot);
    console.log("Staring: "+results.Actors);
    console.log("--------------------------");
    console.log("--------------------------");
    var title = "Movie Title: "+ results.Title;
    fs.appendFile('log.txt', title, format, (err) => {
      if(err) throw err;
    });                                                // starting to try to get the bonus, log results to log.txt.
    // "Year Released: "+ results.Year
    // "IMDB Rating: "+results.imdbRating
    // "Rotten Tomatoes Rating: "+results.Ratings[1].Value
    // "Produced in: "+results.Country
    // "Movie Language: "+results.Language
    // "Movie Plot: "+results.Plot
    // "Staring: "+results.Actors
    // "--------------------------"
    // "--------------------------"
    
  }
})
};// end getMovied function

function getConcerted(value) {
  console.log('https://rest.bandsintown.com/artists/' + value + '/events?app_id=codingbootcamp');
  request('https://rest.bandsintown.com/artists/' + value + '/events?app_id=codingbootcamp', function (error, response, body) {
    if(error && response.statusCode !== 200 ) {console.log('error:', error);} // Print the error if one occurred
    if(response.statusCode !== 200) {console.log('statusCode:', response && response.statusCode);} // Print the response status code if a response was received
    else { 
          var results = JSON.parse(body);
          console.log("I've found " + results.length + " events");
          for(x=results.length -1; x>0; x--) {
            console.log("Result-"+x+":");
            console.log("Venue: "+results[x].venue.name);
            console.log("Location: "+results[x].venue.city+", " + results[x].venue.region+", " +results[x].venue.country);
            console.log("Date: "+moment(results[x].datetime).format("MM/DD/YYYY")+ " - Show Starts at "+moment(results[x].datetime).format("hh:mm A")+" local time.");            
            console.log("--------------------------");
          } 
          console.log("newest listed first, scroll up to see future shows");
          console.log("--------------------------");
          console.log("--------------------------");
      // console.log('body:', body); // Print the HTML for the Google homepage.
    }
  });
};// end getConcerted function. 

function getSpotified(value, raw) {
var spotify = new Spotify(keys.spotify);
spotify
  .request('https://api.spotify.com/v1/search?q='+ value + "&type=track&limit=50")
  .then(function(data) {
      var test = JSON.stringify(data, null, 2);
      var results = JSON.parse(test);
      var matched;
      for (x = 0; x <results.tracks.items.length; x++) {
        var song = results.tracks.items;        
            if (song[x].name.toLowerCase() == raw.toLowerCase()) {
              if(matched) {console.log('multiple matches found specify "song name artist:artistname" in your next search');return};
              console.log("perfect match found");
              console.log("--------------------------");
              console.log("Track by: " + song[x].artists[0].name);// artists
              console.log("Song Name: " + song[x].name); // song name
              console.log("From the Album: " + song[x].album.name);  // album song is from
              console.log("--------------------------");
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