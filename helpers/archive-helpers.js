var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var Promise = require('bluebird');
Promise.promisifyAll(fs);


var request = require('request');

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

// TODO: walk through test for addUrlToList to find where the catch is occurring!!!

exports.addUrlToList = addUrlToList = function(url, callback) {

  // append the url value to archive.paths.list file
  fs.appendFileAsync(paths.list, url + '\n', 'utf8')
    .then(function () {
      callback();
      // return result;
    })
    .catch( function(err) {
      console.log('FAILED TO APPEND TO SITES.TXT = ' + err);
      console.log(err.stack);
    }
  );

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
    }
  );
};

var getHtmlAsync = function(url) {

  var promise = new Promise( function(resolve, reject) {

    // var options = {
    //   'protocol': 'http:',
    //   'hostname': url,
    //   'method': 'GET',
    //   'path': '/'
    // };

    request('http://' + url, function(error, response, body) {

      if (!error && response.statusCode === 200) {
        resolve(body);
      }

      if (error) {
        reject(error);
      }

    });

  });

  return promise;

};

exports.downloadUrls = downloadUrls = function(urls) {
  // taking in an array of urls 

  // where does this array come from?
    // the caller needs to have read from sites.txt, made it an array, and passed it in to this
 
  
  getHtmlAsync(urls[0])
    .then(function(body) {
      console.log('INSIDE downloadUrls success: ' + body);

      // write to sites.txt


    })
    .catch(function(err) {
      console.log('INSIDE downloadUrls ERROR: ' + err);
    });


  // for each url 
    // to a get request on it
    // write a file into the archive/sites directory with the results of the get


};



