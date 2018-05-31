var http = require('http');
var haloworld = '';

haloworld = new Buffer(haloworld);

for (var i = 0; i < 1024 * 10; i++) {
  haloworld += 'a';
}

http.createServer(function (req, res) {
  res.writeHead(200);
  res.end(haloworld);
}).listen(8001);