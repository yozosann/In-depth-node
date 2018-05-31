var foo = function() {
  local = {};
}

var cache = {};
var get = function(key) {
  if(cache[key]) {
    return cache[key];
  } else {
    // get from ...
  }
}

var set = function(key, value) {
  cache[key] = value;
}