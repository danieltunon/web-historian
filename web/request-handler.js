var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var serveAssets = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var urlObj = url.parse(req.url, true);
  var requestedPath = urlObj.pathname;

  if (req.method === 'GET') {
    if (requestedPath === '/') {
      // do response.end sending it down
      serveAssets.serveAssets(res, path.join(archive.paths.siteAssets, '/index.html'), 'text/html');
    } else if ( /.css$/.test(requestedPath) ) {
      console.log('getting css: ' + requestedPath);
      serveAssets.serveAssets(res, path.join(archive.paths.siteAssets, requestedPath), 'text/css');
    } else {
      // search for file that is the end of pathname
      serveAssets.serveAssets(res, path.join(archive.paths.archivedSites, requestedPath), 'text/html');
    }


  } else if (req.method === 'POST') {
    var requestBody = '';

    req.on('data', function(data) {
      requestBody += data;
    });

    req.on('end', function() {
      // retrieve the url value out of requestBody
      var requestedUrl = requestBody.slice(4);
      // check if it is archived already
      archive.isUrlArchived(requestedUrl, function(found) {
        if (found) {
          // if yes, redirect to archive
          res.writeHead(302, {'Location': 'http://127.0.0.1:3000/' + requestedUrl});
          res.end();
        } else {
          // if not archived, check if its in the list (sites.txt)
            // if it is, redirect to loading page
            // if it is not, add it to sites.txt and redirect to loading page
          archive.addUrlToList(requestBody.slice(4));
          res.end('weeeeeeee');
        }
      });
    });

  } else {
    res.writeHead(404, headers);
    res.end('IT ALL EXPLODED!!! RUN!!!');
  }
};
