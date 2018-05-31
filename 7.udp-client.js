var dgram = require('dgram');

var message = new Buffer('射弩前地');
var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, 41234, '0.0.0.0', function(err, bytes){
  client.close();
});