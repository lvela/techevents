"use strict"

var parser = require('xml2json');
var promisify = require("es6-promisify");
var r = require('request');
var request = promisify(r, {multiArgs: true});
var co = require('co');

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

