var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var Promise = require('bluebird');
var httpHelper = require('../web/http-helpers');
Promise.promisifyAll(fs);

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
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

exports.readListOfUrls = readListOfUrls = function(callback) {
  // generate array of urls from reading data out of site.txt
  fs.readFileAsync(paths.list, 'utf8')
    .then(function(fileData) {
      // call the callback function passing in array
      return callback(fileData.trim().split('\n'));
    });
};

exports.isUrlInList = isUrlInList = function(url, callback) {

  readListOfUrls(function(urls) {
    callback(urls.indexOf(url) !== -1);
  });

};

exports.addUrlToList = addUrlToList = function(url, callback) {
  // append the url value to archive.paths.list file
  fs.appendFileAsync(paths.list, url + '\n', 'utf8')
    .then(function () {
      callback();
    }).catch( function(err) {
      console.log('FAILED TO APPEND TO SITES.TXT = ' + err);
      console.log(err.stack);
    });
};

exports.isUrlArchived = function(url, callback) {
  // store array of files inside the sites dir 
  fs.readdirAsync(paths.archivedSites)
    .then(function(sitesDir) {
    // use index of to check if url is present
      return callback(sitesDir.indexOf(url) !== -1 );
    })
    .catch( function(err) {
      console.log('ERROR SEARCHING DIR URL ARCHIVES ' + err);
    });
};

exports.downloadUrls = downloadUrls = function(urls) {

  Promise.all(urls.map(function(url) {
    return httpHelper.getHtmlAsync(url);
  })).then(function(responses) {
    responses.forEach(function(response) {
      fs.writeFileAsync(path.join(paths.archivedSites, response.url), response.body, 'utf8'); 
    });
  }).catch( function(err) {
    console.log('FAILED TO WRITE IN DOWNLOADURLS = ' + err);
    console.log(err.stack);
  });
};



