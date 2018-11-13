var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var readline = require('readline');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
	fs.readFile('./archives/sites.txt', 'utf8', function(err, content){
		if (err) {
			throw err;
		}
		console.log(content)
		callback(content);
	})
};

exports.isUrlInList = function(url, callback) {
	this.readListOfUrls(function(content){
		var arrayUrl = content.split('\n');
		for (var i = 0; i < arrayUrl.length; i++) {
			if (arrayUrl[i] === url) {
			   console.log('The URL Exists');
			  return true ;
		    } 
		}
		return callback(false)
		
	})

};

exports.addUrlToList = function(url, callback) {
	 this.isUrlInList(url, function(existInFile){  
		fs.appendFile('./archives/sites.txt', url.substring(url.indexOf('=') + 1) + "\n", function(){
			console.log('Saved!')
	    })
	  
     })
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
