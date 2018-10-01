var express = require('express');
var app = express();

// app.use(express.static(__dirname + '/'));

app.use(function(req,res,next){
  if (req.url.endsWith('.json')) {
    setTimeout(next, 200);
  } else {
    next();
  }
});
app.use(express.static(__dirname + '/', {
  setHeaders: function(res, path) {
    res.set({
      'Keep-Alive': 'timeout=10',
      'Access-Control-Allow-Origin': 'http://localhost:8081',
      // 'Access-Control-Allow-Methods': 'PUT',
      // 'Access-Control-Allow-Headers': 'Content-Type',

    })
  }
}));


var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Your server is running at http://localhost:%s', port);
});
