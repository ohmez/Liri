var Spotify = require('node-spotify-api');
var opn = require('opn');
var action = "&type="+process.argv[2] +"&offset=1&limit=5&popularity=50-100";
var value = process.argv[3].split(" ").join("+"); 
var spotify = new Spotify({
  id: "3aff523b95f2454189c8330a89228f43",
  secret: "7174b2783984435a8e2f6c4be6f36761"
});
console.log(action + " " + value);
spotify
  .request('https://api.spotify.com/v1/search?q='+ value+ action)
  .then(function(data) {
      var test = JSON.stringify(data, null, 2);
      var results = JSON.parse(test);

    console.log(test); 
    // console.log("Here's what I found on spotify");
    // opn(results.artists.items[0].external_urls.spotify);
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });