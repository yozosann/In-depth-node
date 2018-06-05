var hasBody = function (req) {
  return 'transfer-encodeing' in req.headers || 'content-length' in req.headers;
}

function app(req, res) {
  if(hasBody(req)) {
    var buffers = [];
    req.on('data', function(chunk) {
      buffers.push(chunk);
    });

    req.on('end', function() {
      req.rawBody = Buffer.concat(buffers).toString();
      handle(req, res);
    })
  } else {
    handle(req, res);
  }
 }