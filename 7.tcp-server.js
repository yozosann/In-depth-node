var net = require('net');

var server = net.createServer(function(socket) {
  // 新的链接
  socket.on('data', function(data) {
    socket.write('你好');
  });

  socket.on('end', function(){
    socket.write('断开链接');
  });

  socket.write('欢迎光临');
});

server.listen(8124, function() {
  console.log('server bound');
});