var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var Promise = require('bluebird');
// require more modules/folders here!
var fs = require('fs');
Promise.promisifyAll(fs);

exports.handleRequest = function (req, res) {
  console.log('request: ' + req.url);

  var urlObj = url.parse(req.url, true);
  // set headers
  var headers = {
    'content-type': 'text/html'
  };
    // content-type
    // encoding

  if (req.method === 'GET') {
    if (urlObj.pathname === '/') {

      
      // read input.html file using a promise
      fs.readFileAsync( path.join(__dirname, '/public/index.html'), 'utf8' )
        .then(function(fileData) {
           // set status code
          res.writeHead(200, headers);
          res.end(fileData);
        })
        .catch(function(err) {
          res.writeHead(404, headers);
          res.end('<!DOCTYPE html><html><body>Oops!!</body></html>');  
        });
      // do response.end sending it down

    } else {
      res.writeHead(404, headers);
      res.end(archive.paths.list);

    }
  } else {
    res.writeHead(404, headers);
    res.end(archive.paths.list);
  }
};
