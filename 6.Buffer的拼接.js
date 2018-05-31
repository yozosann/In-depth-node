var fs = require('fs');

var rs = fs.createReadStream('test.md', {highWaterMark: 11});
var data = '';

rs.on('data', function (chunk) {
  data += chunk;
});

rs.on('end', function () {
  console.log(data);
})

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');