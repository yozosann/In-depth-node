var smooth = function(method) {
  return function() {
    var deferred = new Deffered();
    var args = Array.prototype.slice.call(arguments, 0);
    args.push(deferred.callback());
    method.apply(null, args);
    return deferred.promise;
  }
}

var readFile = smooth(fs.readFile);