"use strict"

var parser = require('xml2json');
var promisify = require("es6-promisify");
var r = require('request');
var request = promisify(r, {multiArgs: true});
var co = require('co');


//request('http://geekdom.com/events/feed', function (error, response, body) {
  //if (!error && response.statusCode == 200) {
    ////console.log(body);
    //var json = parser.toJson(body);
    //console.log("entries: " + json.responseData.entries);
    ////console.log("json = \n" + parser.toJson(body));
  //}
//});

//request('http://geekdom.com/events/feed').then((res) => {
  //var response = res[0];
  //var body = res[1];

  //if (response.statusCode == 200) {
    ////console.log(body);
    //var json = parser.toJson(body);
    //console.log("entries: " + json.responseData.entries);
    ////console.log("json = \n" + parser.toJson(body));
  //}
//}).catch((error) => {
  //console.log(error);
//});

co(function *() {
  var res = yield request('http://geekdom.com/events/feed');
  //[response, body] = res;// destructuring isn't supported in this node version :(
  var json = JSON.parse(parser.toJson(res[1]));
  var events = json.rss.channel.item;
  for (let event of events) {
    console.log(event.title);
    console.log(event.description);
    console.log("\n");
  }
  //console.log("events = " + events);

}).catch((error) => {console.log("error = " + error); });

