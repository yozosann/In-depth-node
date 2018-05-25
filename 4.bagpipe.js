var Bagpipe = require('bagpipe');

var bagpipe = new Bagpipe(10);

for (var i = 0; i < 100; i++) {
  bagpipe.push(async, function () {
    // xxxx
  });
}

bagpipe.on('full', function (length) {
  console.log('XXXXX');
});