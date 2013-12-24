/**
 * New node file
 */

//Load up the lexion


var fs = require('fs');

function Jargon(callback){
	this.noun = [];
	this.adj = [];

	exports.loaded = false;
	
	var jar = this;

	fs.readFile('./I102532.csv',{encoding:"ascii"},function(err,data){
		if(err) throw err;
		//return;
		var words = data.split('\n');
		for(var i in words){
			var line = words[i].split(",");
			line[0] = line[0].substring(1,line[0].length-1);
			
			//console.log(line[0]);
			if(line && line[0] && line[0][0] === line[0][0].toLowerCase()){
				if(line[2]){
					line[2] = line[2].substring(1,line[2].length-1);
					var type = line[2].split("|");
					for(var j in type)
					{
						
						if(type[j] == "NN") jar.noun.push(line[0]);
						if(type[j] == "JJ") jar.adj.push(line[0]);
					}
				}
			}
		}
		console.log("Jargon loaded");
		exports.loaded = true;
	});
}

//Fixed Lists

Jargon.prototype.badj = ["pro-active","digital","virtual","harmonized","totally","lifetime","strategic","tactical","logic-based","focused","relational",
       "extended","integrated","re-engineered","groupwide","enhanced","team-based","enterprise"];
	
Jargon.prototype.bnoun = ["simulation","mindset","scenario","opportunity","solution","paradigm",
	"competence","synergy","enabler","culture","strategy","abstract","project"];



Jargon.prototype.go = function() {
	var ret = "";
	var check = Math.floor(Math.random()*3);
	//W1
	if(check === 0) ret += this.badj[Math.floor(Math.random()*this.badj.length)] + ", ";
	else  ret += this.adj[Math.floor(Math.random()*this.adj.length)] + ", ";
	//W2
	if(check == 1) ret += this.badj[Math.floor(Math.random()*this.badj.length)] + " ";
	else  ret += this.adj[Math.floor(Math.random()*this.adj.length)] + " ";
	//W3
	if(check == 2) ret += this.bnoun[Math.floor(Math.random()*this.bnoun.length)] + "?";
	else  ret += this.noun[Math.floor(Math.random()*this.noun.length)] + "?";
	//ret
	return ret;
};

module.exports = new Jargon();