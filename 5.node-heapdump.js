var heapdump = require('heapdump');
var http = require('http');

var leakArray = [];
var leak = function() {
  leakArray.push("leak" + Math.random());
}

http.createServer(function(req, res) {
  leak();
  res.writeHead(200,{'Content-type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337);

console.log('Start 1337 ...');