/**
 * 目的：
 * app.use(querystring);
 * app.use(cookie);
 * app.use(session);
 * app.get('user/:username', getUser);
 * app.put('user/:username, authorize, updateUser)
 */

var handle = function(req, res, stack) {
  var next = function() {
    var middleware = stack.shift();
    if(middleware) {
      middleware(req, res, next);
    }
  }

  next();
}

app.use = function (path) {
  var handle;
  if (typeof path === 'string') {
    handle = {
      // 第一个参数作为路径
      path: pathRegexp(path),
      // 处理
      stack: Array.prototype.slice.call(arguments, 1)
    }
  } else {
    handle = {
      path: pathRegexp('/'),
      stack: Array.prototype.slice.call(arguments, 0)
    };
  }

  routes.all.push(handle);
};

app.match = function (path, routes) {
  var stacks = [];
  for(var i = 0; i<routes.length; i++) {
    var route = routes[i];
    var reg = route.path.regexp;
    var matched = reg.exec(pathname);
    if(matched) {
      stacks = stacks.concat(route.stack);
    }
  }
  return stacks;
};

function fenfa(req, res) {
  var pathname = url.parse(req.url).pathname;
  var method = req.method.toLowerCase();
  var stacks = match(pathname, routes.all);
  if(routes.hasOwnPerperty(method)) {
    // 根据请求方法分发，获取相关的中间件
    stacks.concat(match(pathname, routes[method]));
  }

  if(stacks.length) {
    handle(req, res, stacks);
  } else {
    handle404(req,res);
  }
}