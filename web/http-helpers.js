var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var Promise = require('bluebird');
var request = require('request');
Promise.promisifyAll(fs);

exports.headers = headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, contentType) {

  fs.readFileAsync(asset, 'utf8' )
    .then(function(fileData) {
       // set status code
      headers['content-type'] = contentType;
      res.writeHead(200, headers);
      res.end(fileData);
    })
    .catch(function(err) {
      res.writeHead(404, headers);
      res.end('<!DOCTYPE html><html><body>Oops!!</body></html>');  
    });
};

exports.getHtmlAsync = function(url) {

  return new Promise( function(resolve, reject) {
    request('http://' + url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve({
          'url': url,
          'body': body
        });
      } else if (error) {
        reject(error);
      }
    });
  });
};



// As you progress, keep thinking about what helper functions you can put here!
