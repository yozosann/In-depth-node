var https = require('https');
var fs = require('fs');

var options = {
  hostname: '127.0.0.1',
  port: 1337,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('./client.key'),
  cert: fs.readFileSync('./client.crt'),
  ca: [fs.readFileSync('./ca.crt')],
}

options.agent = new https.Agent(options);

var req = https.request(options, function (res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log(chunk);
  })
});

req.end();

req.on('error', function (e) {
  console.log(e);
})