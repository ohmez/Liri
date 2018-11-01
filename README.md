# LIRI Bot 

## Index
1. [How-To](#How-to-use)
2. [Requirements](#Requirements)
3. [Challenges](#Challenges)
4. [Watch-Me](#Example)

### Overview
In this app LIRI. You'll be able to search 3 API's: Spotify, BandsInTown, and OMDB.
LIRI is like iPhone's SIRI. However you'll have to type your commands. 
LIRI will be a command line node app that takes in parameters and gives you back data.

## Initial-Process
I started by establishing my npm's and making sure I understood their documentation.
I built out my switch with psuedo functions first, then built each function individually.
I created variables to store the responses to simplify calling the content in console and in file system.


## How-to-Use
You have 4 available commands
All commands have a default value if none is provided. 
1. `node liri spotify-this-song "random song name"`
2. `node liri concert-this "random band name"`
3. `node liri do-what-it-says`
    a. This will read random.txt from root directory
    b. You can edit random.txt to adjust what it does, format must remain:
        1b. * this-command,"value for command"
## Requirements
1. In order to use this you'll need your own spotify API key
    2. this will need to be stored in a .env file
        2a. 
         ```js
        # Spotify API keys

        SPOTIFY_ID=your-spotify-id
        SPOTIFY_SECRET=your-spotify-secret

        ```
2. You may need to aquire individual api keys for bandsintown API and OMDB API. 

## Dependencies 
require();
opn();
request();
moment();
dotenv();


## Challenges
My first challenge was understanding how to use the results from a request();
I thought it would be the same for every API I used but for spotify I had to JSON.stringify then JSON.parse to get all the response data. The others worked with inital parse of the response data.
I did run into a challenge with appending multiple lines of content
```javascript
fs.appendFile(file,content,format (err)=>{
    if(err) throw err;
    console.log("file successfully appended")
})
```
So this works great for adding in stored variables or a line or two of text but I foud issues trying to add multiple lines of content:
```javascript
fs.appendFile(file,(content
content
content
content
),format (err)=>{
    if(err) throw err;
    console.log("file successfully appended")
})
```
or even 
```javascript
fs.appendFile(file,{content,
content
content
content
},format (err)=>{
    if(err) throw err;
    console.log("file successfully appended")
})
// this was the closest I could come to creating multiple lines of content
function log(content) {
  fs.appendFile('log.txt',"\n"+content, format, (err) => {
  if(err) throw err;
});    
};
log(a); log(b); log(c); //etc...
``` 
## Example
[Watch-Me](https://drive.google.com/file/d/1yIbmRO8x4s6A03PPot_X4_XlbzSZbGbA/view)
