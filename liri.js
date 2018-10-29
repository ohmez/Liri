require("dotenv").config();
var keys = require('./keys.js');
var opn = require('opn');
var request = require('request');
var moment = require('moment');
if(!process.argv[3]) { var value = 'The+Sign'; var raw = 'The Sign' } 
if(process.argv[3]) {
var raw = process.argv[3];
var value = process.argv[3].split(" ").join("+"); }
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
// example of response 
// { offers:
//   [ { type: 'Tickets',
//       url: 'https://www.bandsintown.com/t/100267054?app_id=codingbootcamp&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket',
//       status: 'available' } ],
//  venue:
//   { name: 'Mandalay Bay Events Center',
//     country: 'United States',
//     region: 'NV',
//     city: 'Las Vegas',
//     latitude: '36.128561',
//     longitude: '-115.1711298' },
//  datetime: '2018-12-30T19:00:48',
//  on_sale_datetime: '',
//  description: '',
//  lineup: [ 'Maroon 5' ],
//  id: '100267054',
//  artist_id: '510',
//  url: 'https://www.bandsintown.com/e/100267054?app_id=codingbootcamp&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=event' }

function getConcerted() {
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
      // console.log('body:', body); // Print the HTML for the Google homepage.
    }
  });
};
function getSpotified() {
var spotify = new Spotify(keys.spotify);
spotify
  .request('https://api.spotify.com/v1/search?q='+ value+ "&type=track&limit=50")
  .then(function(data) {
      var test = JSON.stringify(data, null, 2);
      var results = JSON.parse(test);
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