// 曾经的处理方式
var proxy = new EventProxy();

proxy.all("template", "data", "resources", function (template, data, resources) {
  // TODO
})

proxy.bind('err', function(err) {
  // TODO
})

fs.readFile(template_path, "utf-8", function (err, template) {
  if(err) {
    proxy.emit('err', err);
  }
  proxy.emit("done", "template", template);
})

db.query(sql, function (err, data) {
  if(err) {
    proxy.emit('err', err);
  }
  proxy.emit("done", "data", data);
})

l10n.get(template_path, function (err, resources) {
  if(err) {
    proxy.emit('err', err);
  }
  proxy.emit("done", "resources", resources);
})

// 因为异常处理的原因代码量一下子就对了起来，而在ep实践过程中改善了这个问题
// 将emit done 和 err都绑定到了一个done方法上
proxy.fail(callback);

fs.readFile(template_path, "utf-8", proxy.done('template'));
db.query(sql, proxy.done('data'));
l10n.get(template_path, proxy.done('resources'));
// 我们只需要关注业务逻辑，不需要关注错误处理

proxy.fail(callback) 
// 等价于
proxy.bind('err', function(err){
  // 解绑所有函数
  proxy.unbind();
  callback(err);
})

proxy.done('resources');
// 等价于
let anonymous = function (err, resources) {
  if(err) {
    proxy.emit('err', err);
  }
  proxy.emit("done", "resources", resources);
}

// 如果只有一个回调函数传给ep 那么无须考虑异常，done会为你自己处理，我们还可以自定义一些数据处理而非默认的
// 默认的
let anonymous = function (err, resources) {
  if(err) {
    proxy.emit('err', err);
  }
  proxy.emit("done", "resources", resources);
}
// 数据处理
proxy.done('tpl', function(content) {
  content.replace('s', 'S');
  return content;
});

// 这里会帮你自己做异常处理，除此之外回调的数据是处理过的数据。