// 类似于EventProxy
Deferred.prototype.all = function(promises) {
  var count = promises.length;
  var that = this;
  var results = [];
  promises.forEach(function(promise, i) {
    promise.then(function(data) {
      count--;
      results[i] = data;
      if(count === 0) {
        that.resolve(results);
      }
    }, function(err) {
      that.reject(err);
    });
  });
  return this.promise;
}

// 应用场景
var promise1 = readFile('foo.txt', "utf-8");
var promise2 = readFile('bar.txt', "utf-8");
deferred.all([promise1, promise2]).then(function(results) {
  // TODO
}, function(error) {
  // TODO
});