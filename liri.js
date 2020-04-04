require("dotenv").config();
var keys = require("./keys.js");
var $ = require("jquery");
var request = require('ajax-request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var JS = require('jsonfile');
const file = '/tmp/data.json';
JS.readFile(file, function (err, obj) {
  if (err) console.error(err)
  console.dir(obj)
})

firstEntry = process.argv[3];
secondEntry = process.argv[4];
var output;

/*
   * `concert-this`
	node liri.js concert-this <artist/band name here>
		* Name of the venue

     		* Venue location

     		* Date of the Event (use moment to format this as "MM/DD/YYYY")

	ex: https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp
*/
switch (process.argv[2])
	{
	case "concert-this":
		var queryURL = "https://rest.bandsintown.com/artists/"+ firstEntry +"/events?app_id=codingbootcamp";
		request(queryURL, function(response) 
		{
			
			console.log(response);
		});
		
    	
	break;
	case "spotify-this-song":
		output =
		spotify.search({ type: 'track', query: firstEntry , limit: 1 }, function(err, data) {
			if (err) {
			  return console.log('Error occurred: ' + err);
			}
		  
		  console.log("========================================");
		  console.log("The artist name is: " + data.tracks.items[0].artists[0].name);
		  console.log("========================================");
		  console.log("The song name is: " + data.tracks.items[0].album.name); 
		  console.log("========================================");
		  console.log("The preview link of the song is: " + data.tracks.items[0].album.external_urls.spotify);
		  console.log("========================================");
		  console.log("The album name is: " + data.tracks.items[0].name); 
		  });
	break;



	};

/*
   * `spotify-this-song`
	node liri.js spotify-this-song '<song name here>'
		* Artist(s)

     		* The song's name

     		* A preview link of the song from Spotify

     		* The album that the song is from

*/

 
  
/*
   * `movie-this`
	node liri.js movie-this '<movie name here>'
		* Title of the movie.
       		* Year the movie came out.
       		* IMDB Rating of the movie.
       		* Rotten Tomatoes Rating of the movie.
       		* Country where the movie was produced.
       		* Language of the movie.
       		* Plot of the movie.
       		* Actors in the movie.

   * `do-what-it-says`
	node liri.js do-what-it-says
		* It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

    		* Edit the text in random.txt to test out the feature for movie-this and concert-this.
*/