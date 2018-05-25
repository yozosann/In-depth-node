// 异步串行 （前者执行完执行后者再执行cb，没有依赖）
async.series([
  function(cb) {
    fs.readFile('file1.txt', 'utf-8',cb);
  }, 
  function(cb){
    fs.readFile('file2.txt', 'utf-8',cb);
  }
], function(err, results) {
  // results -> [file1.txt, file2.txt]
});

// 异步并行 （两个同时执行完再执行cb，最终cd依赖两个值）
async.parallel([
  function(cb) {
    fs.readFile('file1.txt', 'utf-8',cb);
  }, 
  function(cb){
    fs.readFile('file2.txt', 'utf-8',cb);
  }
], function(err, results) {
  // results -> [file1.txt, file2.txt]
});

// 后者依赖前者数据
async.waterfall([
  function(cb) {
    fs.readFile('file1.txt', 'utf-8',cb);
  }, 
  function(arg1, cb){
    fs.readFile('arg1', 'utf-8',cb);
  }
], function(err, result) {
  // result -> file2.txt
});

// 声明依赖自动处理
var deps = {};
async.auto(deps);
