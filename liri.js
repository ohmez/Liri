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

function log(content) {
  fs.appendFile('log.txt',"\n"+content, format, (err) => {
  if(err) throw err;
});    
}; // end log value for bonus challenge. 

function start(raw) {
  var first = "searching for: " +raw;
  console.log("--------------------------");
  console.log("--------------------------");
  console.log(first); // initial message
  console.log("--------------------------");
  log("--------------------------");
  log("--------------------------");
  log(first);
};// end start function, runs in all cases. 

function getMovied(value) {
request('http://www.omdbapi.com/?t='+value+'&apikey=trilogy', function (error, response,body) {
  if(error && response.statusCode !== 200 ) {console.log('error:', error);} // Print the error if one occurred
  if(response.statusCode !== 200) {console.log('statusCode:', response && response.statusCode);}
  else { 
    var results = JSON.parse(body);
    // console.log(results);
    var title = "Movie Title: "+ results.Title;
    var year = "Year Released: "+ results.Year;
    var rating = "IMDB Rating: "+results.imdbRating;
    var rotten = "Rotten Tomatoes Rating: "+results.Ratings[1].Value;
    var produced = "Produced in: "+results.Country;
    var language = "Movie Language: "+results.Language;
    var plot = "Movie Plot: "+results.Plot;
    var starring = "Staring: "+results.Actors;
    console.log(title);
    console.log(year);
    console.log(rating);
    console.log(rotten);
    console.log(produced);
    console.log(language);
    console.log(plot);
    console.log(starring);
    console.log("--------------------------");
    console.log("--------------------------");
    log("--------------------------");
    log(starring);
    log(title);
    log(year);
    log(rating);
    log(rotten);
    log(produced);
    log(language);
    log(plot);
    log("--------------------------");    
  }
})
};// end getMovied function

function getConcerted(value) {
    request('https://rest.bandsintown.com/artists/' + value + '/events?app_id=codingbootcamp', function (error, response, body) {
    if(error && response.statusCode !== 200 ) {console.log('error:', error);} // Print the error if one occurred
    if(response.statusCode !== 200) {console.log('statusCode:', response && response.statusCode);} // Print the response status code if a response was received
    else { 
          var results = JSON.parse(body);
          var totalE = "I've found " + results.length + " events";
          console.log(totalE);
          for(x=results.length -1; x>0; x--) {
            var resultNum = "Result-"+x+":";
            var venue = "Venue: "+results[x].venue.name;
            var location = "Location: "+results[x].venue.city+", " + results[x].venue.region+", " +results[x].venue.country;
            var date = "Date: "+moment(results[x].datetime).format("MM/DD/YYYY")+ " - Show Starts at "+moment(results[x].datetime).format("hh:mm A")+" local time.";
            console.log(resultNum);
            console.log(venue);
            console.log(location);
            console.log(date);            
            console.log("--------------------------");
            log(resultNum);
            log(venue);
            log(location);
            log(date);            
            log("--------------------------");
          } 
          console.log("newest listed first, scroll up to see future shows");
          log("newest listed first, scroll up to see future shows");
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
      var song = results.tracks.items;        
      for (x = 0; x <results.tracks.items.length; x++) {
            if (song[x].name.toLowerCase() == raw.toLowerCase()) {
              if(matched) {console.log('multiple matches found specify "song name artist:artistname" in your next search');return};
              var trackBy = "Track by: " + song[x].artists[0].name;
              var songName = "Song Name: " + song[x].name;
              var albumName = "From the Album: " + song[x].album.name;
              var link = song[x].external_urls.spotify;
              console.log("perfect match found");
              console.log("--------------------------");
              console.log(trackBy);// artists
              console.log(songName); // song name
              console.log(albumName);  // album song is from
              console.log("--------------------------");
              console.log("--------------------------");
              console.log("enjoy");
              opn(link); // preview link of song
              matched = true;
              log(trackBy);
              log(songName);
              log(albumName);
              log(link);
              log("--------------------------");
              log("--------------------------");

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
        log("no match found but here's the closest");
        log("--------------------------");
        log("Track by: " + song[0].artists[0].name);// artists
        log("Song Name: " + song[0].name); // song name
        log("From the Album: " + song[0].album.name);  // album song is from
        log("--------------------------");
        log(song[0].external_urls.spotify);
      }
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
};// end if spotify requested