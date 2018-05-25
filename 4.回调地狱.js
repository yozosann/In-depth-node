// 回调地狱：每一异步依赖于上一次异步结果
obj.api1(function (value1) {
  obj.api2(value1, function (value2) {
    obj.api3(value2, function (value3) {
      obj.api4(value3, function (value4) {
        cb(value4);
      })
    })
  })
})

// 采用event.emitter
var emitter = new event.emitter();
emitter.on("step1", function () {
  obj.api1(function (value1) {
    emitter.emit("step2", value1);
  })
})
emitter.on("step2", function () {
  obj.api1(function (value2) {
    emitter.emit("step3", value2);
  })
})
emitter.on("step3", function () {
  obj.api1(function (value3) {
    emitter.emit("step4", value3);
  })
})
emitter.on("step4", function () {
  obj.api1(function (value4) {
    cb(value4);
  })
})
emitter.emit("step1");

// 这确实揭开了回调，但是明显更复杂，代码量更多了。
