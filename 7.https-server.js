var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

https.createServer(options, function (req, res) {
  res.writeHead(200, { 'Content-type': 'text/plain' });
  res.end('Hello World\n');
}).listen(1337);

console.log('Start 1337 ...');