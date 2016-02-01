var tape = require('tape');
var tests = require('../');
var methods = require('../methods.js');

var fixture = {
  setup: function(test, cb) {
    cb(null, methods);
  },
  teardown: function(test, db, cb) {
    cb();
  }
};

tests(tape, fixture);
