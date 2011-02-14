
/**
 * Module dependencies.
 */

var spawn = require('child_process').spawn
  , should = require('should')
  , http = require('http');

require('./common');

var calls = 0;

// child process

var child = spawn('node', [__dirname + '/master.js']);

// listening

child.stdout.on('data', function(chunk){
  var options = { host: 'localhost', port: 3000 };

  http.get(options, function(res){
    ++calls;
    res.statusCode.should.equal(200);
    child.kill('SIGQUIT');
  });
  
  http.get(options, function(res){
    ++calls;
    res.statusCode.should.equal(200);
  });
});

child.on('exit', function(){
  calls.should.equal(2);
});