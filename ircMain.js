/**
 * THE MAIN CLASS!!!!
 * 
 * (It's not Calculus... its something else)
 */

var http = require('http');
var irc = require('irc');
var secret = require('./secret.js');
var jargon = require('./jargon.js');
//console.log(irc);
var client  = new irc.Client(secret.irc, secret.name, { channels: [secret.channel]});

var tumblr = require('tumblr.js');
Tumblrclient = new tumblr.createClient(secret.tumblrKey);

client.addListener('error', function(message) {
    console.log('error: ', message);
});

client.addListener("message", function(from, to, message){
	if(message.indexOf("http://i.imgflip.com/") != -1){
		console.log(message);
		Tumblrclient.photo(secret.tumblrSite, {source:message}, function(log){console.log(log);});
	}else if(message.indexOf("Failed to generate meme: Couldn't find any memes for ") != -1){
		var parts = message.split(" Couldn't find any memes for ");
		console.log(parts[1]);
		http.get("http://imgflip.com/memesearch?q="+parts[1],function(res){
			var found = false;
			res.on('data', function (chunk) {
				if(!found){
					//console.log(typeof chunk);
					var read = String(chunk);
					//console.log(read);
					var data = read.match(/\/memetemplate\/\d+/g);
					//var data = chunk.getElementById("memeTemplates").getElementsByClassName("mt-title")[0].childNodes[1].href;
					if(data){
						data = data[0].split("/")[2];
						client.say(secret.channel, "try " + data);
						console.log(data);
						found = true;
					};
				};
			    //console.log('BODY: ' + chunk);
			  });
		});
	}else if(message.indexOf("no, it does not align with our core business strategy") != -1){
		client.say(secret.channel, "Have you considered trying " + jargon.go());
	};
});