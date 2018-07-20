// form
var handle = function(req, res) {
  if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    req.body = querystring.parse(req.rawBody);
  }
  todo(req.body);
}

// json
JSON.parse()

// xml
require('xml2js');
xml2js.parsestring(req.rawBody, function(err, xml) {
  if(err) xxx;
  req.body = xml;
  todo();
})

// 附件
require('formidable');
function attchment(req, res) {
  if(hasBody(req)) {
    if(mime(req) === 'multipart/form-data') {
      var form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files)=>{
          req.body = fields;
          req.files = files;
          handle(req, res);
        })
     }
  }
}