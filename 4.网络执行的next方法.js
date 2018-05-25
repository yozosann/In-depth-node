function xxx(req, res, next) {
  // TODO
  next();
}

app.use(xxx)
// => 
app.use = function (route, fn) {
  this.stack.push({ route: route, fandle: fn });
  return this;
}

function next() {
  // some code
  layer = stack[index++];
  layer.handle(req, res, next);
}

