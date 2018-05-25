// Promise实现
var Promise = function () {
  EventEmitter.call(this);
}
util.inherits(Promise, EventEmitter);

Promise.prototype.then = function (fullfilledHandler, errorHandler, progressHandler) {
  if (typeof fulfilledHandler === 'function') {
    this.once('success', fullfilledHandler);
  }

  if (typeof errorHandler === 'function') {
    this.once('erroe', errorHandler);
  }

  if (typeof progressHandler === 'function') {
    this.once('progress', progressHandler);
  }

  return this;
}
// then只是将方法存放了起来，还需要一个地方触发执行这些回调
var Deferred = function () {
  this.state = 'unfulfilled';
  this.promise = new Promise();
}

Deferred.prototype.resolve = function (obj) {
  this.state = 'fulfilled';
  this.promise.emit('success', obj);
}

Deferred.prototype.reject = function (obj) {
  this.state = 'failed';
  this.promise.emit('error', obj);
}

Deferred.prototype.progress = function (obj) {
  this.promise.emit('progress', obj);
}
// 最终实现api
var promisify = function (res) {
  var deferred = new Deferred();
  var result = '';
  res.on('data', function (chunk) {
    result += chunk;
    deferred.progress(chunk);
  });
  res.on('end', function () {
    deferred.resolve(result);
  });
  res.on('error', function (err) {
    deferred.reject(err);
  });

  return deferred.promise;
}
// 这样我们的promise就封装好了
// 原来的调用
res.setEncoding('utf8');
res.on('data', function (c) {
  console.log('BODY: ', c);
})
res.on('end', function (c) {
  // DONE
})
res.on('error', function (c) {
  // ERROR
})

// 现在变为
promisify(res).then(function () {
  // DONE
}, function () {
  // ERROR
}, function (chunk) {
  // progress
  console.log('BODY: ', chunk)
})

// Q模块的实现
defer.prototype.makeNodeResolver = function() {
  var that = this;
  return function(error , value) {
    if(error) {
      self.reject(error);
    } else if(arguments.length > 2) {
      self.resolve(array_slice(arguments, 1));
    } else { 
      self.resolve(value);
    }
  };
};

var readFile = function(file, encoding) {
  var deferred = Q.defer();
  fs.readFile(file, encoding, deferred.makeNodeResolver());
  return deferred.promise;
}