var sessions = {};
var key = 'session_id';
var EXPIPERS = 20 * 60 * 1000;

var generate = function () {
  var session = {};
  session.id = (new Date()).getTime() + Math.random();
  session.cookie = {
    expire: (new Date()).getTime() + EXPIPERS
  };
  sessions[session.id] = session;
  return session;
};

var app = function (req, res) {
  var id = req.cookies[key];
  if (!id) {
    req.session = generate();
  } else {
    var session = sessions[id];
    if (session) {
      if (session.cookie.expire > (new Date()).getTime()) {
        session.cookie.expire = (new Date()).getTime() + EXPIPERS;
        req.session = session;
      } else {
        delete sessions[id];
        req.session = generate()
      }
    } else {
      req.session = generate();
    }
  }
  handle(req, res);
}

res.writeHead = function() {
  var cookies = res.getHeader('Set-Cookie');
  // 写入cookies
  var session = serilaize(key, req.session.id);
  cookies = Array.isArray(cookies) ? cookies.concat(sessions) : [cookies,session];
  res.setHeader('Set-Cookie', cookies);
  return writeHead.apply(this, arguments);
}