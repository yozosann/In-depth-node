// 解决回调地狱：
// 原本：
fs.readdir(xxx, function (err, files) {
  files.forEach(function (item) {
    fs.readfile(item, function (err, res) {
      // 一系列操作.....
    })
  })
});

// 现在我们以ui渲染为例，我们需要拿到模板，数据，本地化资源才能进行渲染：
// 我们首先引入哨兵函数：
// 我们每拿到一样东西计数加一，等拿到所有东西执行回调，该函数为哨兵函数工厂可以自己定义回调和需要几样结果
var after = function (times, callback) {
  var count = 0, results = {};
  return function (key, value) {
    results[key] = value;
    count++;
    if (count === times) {
      callback(results);
    }
  }
}

// 初始化哨兵函数
var done = after(times, render);
var emitter = new event.Emitter();
emitter.on("done", done);

fs.readFile(template_path, "utf-8", function (err, template) {
  emitter.emit("done", "template", template);
})

db.query(sql, function (err, data) {
  emitter.emit("done", "data", data);
})

l10n.get(template_path, function (err, resources) {
  emitter.emit("done", "resources", resources);
})
// 如此就解决了回调地狱的问题。

// 看似完美，但是也有不足在于每次我们都需要提取结果进行emit，每次都需要准备done函数，如果这些都抽象化？
// 采用EventProxy模块
var proxy = new EventProxy();

proxy.all("template", "data", "resources", function (template, data, resources) {
  // TODO
})

fs.readFile(template_path, "utf-8", function (err, template) {
  proxy.emit("done", "template", template);
})

db.query(sql, function (err, data) {
  proxy.emit("done", "data", data);
})

l10n.get(template_path, function (err, resources) {
  proxy.emit("done", "resources", resources);
})

// 用all订阅多个事件，当每个事件都触发all回调才触发
// 除了all 还有 tail区别在于 all只会执行一次， tail在于如果执行一次后，某一次事件再次触发将会采用最新的数据继续执行回调。
// 订阅事件列表和参数列表一致。
// 除此之外还提供after函数

proxy.after("data", 10, function (datas) {
  // TODO datas是十次数据的数组
});
// 执行十次data事件后执行回调

