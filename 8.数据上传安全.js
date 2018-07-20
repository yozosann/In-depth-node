var bytes = 1024;

function x(req, res) {
  var received = 0;
  var len = req.headers['content-length'] ? parseInt(req.headers['content-length'], 10) : null;
  if(len && len > bytes) {
    res.writeHead(403);
    res.end();
    return;
  }

  // limit
  req.on('data', function(chunk) {
    received += chunk.length;
    if(received > bytes) {
      req.destroy();
    };
  })

  handle(req, res);
}