var tumblr = require('tumblr.js');
var secret = require('secret.js');
var client = new tumblr.createClient(secret.tumblrKey);

client.photo(secret.tumblrSite, {source:"http://img367.imageshack.us/img367/8980/lolzcat8rd.jpg"}, function(log){console.log(log);});


//var Blog = require('tumblr').Blog;
//var blog = new Blog('dontlookherekthxbye.tumblr.com', oauth);

//blog.post({source:"http://img367.imageshack.us/img367/8980/lolzcat8rd.jpg"});