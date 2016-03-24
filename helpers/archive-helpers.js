var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var Promise = require('bluebird');
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

exports.readListOfUrls = function(callback) {
  // generate array of urls from site.txt
  
  fs.readFileAsync(paths.list, 'utf8')
    .then(function(fileData) {
      callback(fileData.trim().split('\n'));
    });
  // call the callback function passing in array

};

exports.isUrlInList = function() {
};

exports.addUrlToList = function(url) {

  // append the url value to archive.paths.list file
  fs.appendFileAsync(paths.list, url + '\n', 'utf8')
    .catch( function(err) {
      console.log('FAILED TO APPEND TO SITES.TXT = ' + err);
    }
  );

};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
