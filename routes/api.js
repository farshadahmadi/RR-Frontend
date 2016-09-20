/*
 * Serve JSON to our AngularJS client
 */

var request = require("request");

exports.pipe = function (req, res) {

  var url = req.originalUrl.slice('/api/pipe/'.length);

  req
    .pipe(request(url))
    .on('error', function(err){
      res.status(500).send('Connection error. Maybe the host is down');
    })
    .pipe(res);
}
