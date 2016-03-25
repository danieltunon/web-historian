// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archive = require('../helpers/archive-helpers');



var fetchHtml = function() {
  // read sites.txt to retrieve the array of urls - readListOfUrls helper

  // in callback to readListOfUrls
  // call downloadUrls and pass it array
  console.log("IM RUNNING!!!! " + new Date());
  archive.readListOfUrls( function(urls) {
    if (urls.length > 0) {
      archive.downloadUrls(urls);
    }
  });



};

fetchHtml();


