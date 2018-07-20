var middleware = function(err, req, res, next) {
  next();
}

app.use(function (err, req, res, next) {

});

// 为了区分异常处理中间件和普通中间件
// handle500()
var handle500 = function(err, req, res, stack) {
  stack = stack.filter(function(middleware) {
    return middleware.length === 4;
  });

  var next = function() {
    var middleware = stack.shift();
    if(middleware) {
      middleware(err, req, res, next);
    }
  }

  next();
};