/**
 * New node file
 */

var http = require("http");
http.get("http://imgflip.com/memesearch?q=wizard",function(res){
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
						console.log(data);
						found = true;
					}
				}
			    //console.log('BODY: ' + chunk);
			  });
		});