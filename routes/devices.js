/*
 * Serve JSON to our AngularJS client
 */

var request = require("request");

exports.name = function (req, res) {
  request.get('http://130.230.142.101:3000').pipe(res);
  //ires.json({
  	//name: 'Bob'
  //});
};
