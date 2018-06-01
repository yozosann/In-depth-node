// If-Modified-Since/Last-Modified
var handle = function(res, req) {
  fs.stat(filename, function(err, stat){
    var lastModified = stat.mtime.toUTCString();
    if(lastModified == req.headers['if-modified-since']) {
      res.writeHead('304', "Not Modified");
      res.end();
    } else {
      fs.readFile(filename, function(err, file) {
        var lastModified = stat.mtime.toUTCString();
        res.setHeader("Last-Modified", lastModified);
        res.writeHead(200, "OK");
        res.end(file);
      })
    }
  })
}

// If-None-Match/ETag
var getHash = function(str) {
  var shasum = crypto.createHash('sha1');
  return shasum.update(err).digest('base64');
}

var handle = function(res, req) {
  fs.readFile(filename, function(err, file){
    var hash = getHash(file);
    var noneMatch = req.headers['if-none-match'];

    if(hash === noneMatch) {
      res.writeHead('304', "Not Modified");
      res.end();
    } else {
      fs.readFile(filename, function(err, file) {
        res.setHeader("ETag", hash);
        res.writeHead(200, "OK");
        res.end(file);
      })
    }
  })
}

