require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var fs = require('fs');
var moment = require('moment');
moment().format();

var option = process.argv[2];
var firstEntry = process.argv.slice(3).join(" ");


function run(option,firstEntry)
	{
	switch(option)
		{
			case "concert-this":
				concerts();	
			break;
			case "spotify-this-song":
				spot();
			break;
			case "movie-this":
				movie();
			break;
			case "do-what-it-says":
				random(firstEntry);
			break;
		default:
			console.log("Please try again.");
			break;
		}
	}

run(option,firstEntry);



function concerts()
/* 		* `concert-this` node liri.js concert-this <artist/band name here>
			* Name of the venue
     		* Venue location
     		* Date of the Event (use moment to format this as "MM/DD/YYYY")

		ex: https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp
*/
	{
	
	var queryURL = "https://rest.bandsintown.com/artists/"+ firstEntry +"/events?app_id=codingbootcamp";
		
	// Make a request for a user with a given ID
	axios.get(queryURL)
	.then(function (response) {
		// handle success
		for(var i = 0; i<5; i++)
		{
		console.log("");
		console.log("Name of the Venue: " + response.data[i].venue.name);

		console.log("Venue location: " + response.data[i].venue.country + ", " + response.data[i].venue.city);

		var dTime = moment(response.data[i].datetime).format("MM/DD/YYYY")
		console.log("Date of the Event: " + dTime);
		console.log("+++++++++++++++++++++++++++++++");

		}
	})
	.catch(function (error) {
		// handle error
		console.log("Please enter an artist name");
	})
	.then(function () {
		// always executed
	});
	}

function spot()
/*		* `spotify-this-song` node liri.js spotify-this-song '<song name here>'
			* Artist(s)
     		* The song's name
     		* A preview link of the song from Spotify
     		* The album that the song is from

*/
	{
		if(firstEntry == false)
		{
			firstEntry = "Ace of Base The Sign";
		}

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
	}

function movie()
/*		* `movie-this` node liri.js movie-this '<movie name here>'
			* Title of the movie.
       		* Year the movie came out.
       		* IMDB Rating of the movie.
       		* Rotten Tomatoes Rating of the movie.
       		* Country where the movie was produced.
       		* Language of the movie.
       		* Plot of the movie.
			* Actors in the movie.
*/
	{
		if(firstEntry == false)
		{
			firstEntry = "Mr. Nobody";
		}
		
		var queryURL = "http://www.omdbapi.com/?t=" + firstEntry + "&y=&plot=short&apikey=trilogy";
		// Make a request for a user with a given ID
		axios.get(queryURL)
		.then(function (response) {
			// handle success
			console.log("=============================");
			console.log("Title of the movie: " + response.data.Title);
			console.log("=============================");
			console.log("Year it came out: " + response.data.Year);
			console.log("=============================");
			console.log("IMBD Rating: " + response.data.imdbRating);
			console.log("=============================");
			console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
			console.log("=============================");
			console.log("Country where it was produced: " + response.data.Country);
			console.log("=============================");
			console.log("Language: " + response.data.Language);
			console.log("=============================");
			console.log("Plot: " + response.data.Plot);
			console.log("=============================");
			console.log("Actors in the movie: " + response.data.Actors);
			console.log("=============================");

		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
		});
	}
function random()
/*		* `do-what-it-says` node liri.js do-what-it-says
			* It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    		* Edit the text in random.txt to test out the feature for movie-this and concert-this.
*/
	{
	fs.readFile("random.txt", "utf8", function (error, data) 
		{
		if (error) {
		return console.log(error);
		}
		// CATCH DATA AND USE THE .SPLIT() METHOD TO SEPARATE OBJECTS WITHIN OUR NEW ARRAY
		var readData = data.split(",");

		// TAKE OBJECTS FROM RANDOM.TXT TO PASS AS PARAMETERS
		option = readData[0];
		firstEntry = readData[1];
			// CALL OUR FUNCTION WITH OUR NEW PARAMETERS...
		run(option,firstEntry);
		});
	}

