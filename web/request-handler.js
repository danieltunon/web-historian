var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var Promise = require('bluebird');
var serveAssets = require('./http-helpers');
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

      // do response.end sending it down
      serveAssets.serveAssets(res, '/public/index.html', 'text/html');

    } else if ( /.css$/.test(urlObj.pathname) ) {
      console.log('getting css: ' + urlObj.pathname);
      serveAssets.serveAssets(res, '/public' + urlObj.pathname, 'text/css');
    } else {

      // search for file that is the end of pathname
      // fs.readFileAsync( path.join(__dirname, '../' ))
      // if found, return contents

      // else, return 404


      res.writeHead(404, headers);
      res.end(archive.paths.list);

    }
  } else {
    res.writeHead(404, headers);
    res.end(archive.paths.list);
  }
};
