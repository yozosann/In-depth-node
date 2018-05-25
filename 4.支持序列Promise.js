// 理想情况
Promise().then(obj.api1).then(obj.api2).then(obj.api3).then(obj.api4).then(function(value4) {
  // Do something with value4
}, function(error) {
  // 1-4 's error
}).done();

// 改造一下Deferred
var Deffered = function() {
  this.promise = new Promise();
}

// 完成态
Deffered.prototype.resolve = function(obj) {
  var promise = this.promise;
  var handler;
  while((handler = promise.queue.shift())) {
    if(handler && handler.fulfilled) {
      var ret = handler.fulfilled(obj);
      if(ret && ret.isPromise) {
        ret.queue = promise.queue;
        this.promise = ret;
        return;
      }
    }
  }
}

// 失败态
Deffered.prototype.reject = function(obj) {
  var promise = this.promise;
  var handler;
  while((handler = promise.queue.shift())) {
    if(handler && handler.error) {
      var ret = handler.error(obj);
      if(ret && ret.isPromise) {
        ret.queue = promise.queue;
        this.promise = ret;
        return;
      }
    }
  }
}

// 生成回调函数
Deferred.prototype.callback =  function() {
  var that = this;
  return function(err, file) {
    if(err) {
      return that.reject(err)
    }
    that.resolve(file);
  }
}

var Promise = function() {
  this.queue = [];
  this.isPromise = true;
}

Promise.prototype.then = function (fullfilledHandler, errorHandler) {
  var handler = {};
  if (typeof fulfilledHandler === 'function') {
    handler.fulfilled = fulfilledHandler;
  }

  if (typeof errorHandler === 'function') {
    handler.error = errorHandler;
  }

  this.queue.push(handler);
  return this;
}

// 实际运用
var readFile1 = function(file, encoding) {
  var deferred = new Deffered();
  fs.readFile(file, encoding, defferred.callback());
  return deferred.promise;
}

var readFile2= function(file, encoding) {
  var deferred = new Deffered();
  fs.readFile(file, encoding, defferred.callback());
  return deferred.promise;
}

readFile1('1.txt', 'utf8').then(function(file1) {
  return readFile2(file1.trim(), 'utf8');
}).then(function(file2){
  console.log(file2);
});