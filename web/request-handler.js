var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

 var sendResponce = function(response, data, statusCode ){
 	var statusCode = statusCode || 200;
 	response.writeHead(statusCode, httpHelper.headers);
 	response.end(data); 
 }

 var collectData = function(request){
 	var data = '';
 	request.on('data', function (chunk){
 		data += chunk;
 	})
 	request.on('end', function(){
 	    archive.addUrlToList(data);
 	})


 }
exports.handleRequest = function (req, res) {
   
	  fs.readFile('./web/public/index.html', function(err, data){
		if (err) {
		   throw err; 
		}      
		res.writeHead(200, httpHelper.headers);
		res.write(data);
	    res.end(); 
	   }) 
  
  if(req.method === 'POST'){
  	
    collectData(req);
    sendResponce(res, 'done');
  }
 // res.end(archive.paths.list);
};
