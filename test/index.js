var test = require('tape');
var after = require('after');
var data = require('./data.js');
var methods = require('../methods.js');

module.exports = function(createDb, done) {

  test('Methods exist', function(t) {
    createDb(function(err, db) {
      t.error(err);
      Object.keys(methods).forEach(function(method) {
        t.ok(db[method], 'db has method ' + method);
      });
      done(db, function(err) {
        t.error(err);
        t.end();
      });
    });
  });

  test('Put a node', function(t) {
    createDb(function(err, db) {
      t.error(err);
      db.putNode(data[0], function(err, node) {
        t.error(err);
        t.ok(node, 'node returned');
        t.ok(node.index, 'node has an index');
        done(db, function(err) {
          t.error(err);
          t.end();
        });
      });
    });
  });


  test('Predicate stream', function(t) {
    createDb(function(err, db) {
      var keys = [];
      t.error(err);
      t.test('predicate stream setup', function(tt) {
        db.putNode(data[0], function(err, node) {
          tt.error(err);
          tt.end();
        });
      });

      t.test('emit put events', function(tt) {
        tt.plan(4);
        var stream = db.predicateStream();
        var next = after(2, function doneStreaming(err, res) {
          stream.destroy();
        });
        stream.on('data', function(event) {
          tt.ok(event.key, 'event key is ok');
          tt.ok(event.value, 'event value is ok');
          keys.push(event.key);
          next(null);
        });
      });

      t.test('emit del events', function(tt) {
        console.log(keys);
        tt.plan(4);
        var stream = db.predicateStream({ old: false });
        var next = after(2, function doneStreaming(err, res) {
          stream.destroy();
          tt.end();
        });
        stream.on('data', event => {
          tt.equal(event.type, 'del', 'event type is del');
        });
        db.delField({ key: keys[0] }, (err) => tt.error(err));
        db.delField({ key: keys[1] }, (err) => tt.error(err));
      });

      t.test('predicate stream teardown', function(tt) {
        done(db, function(err) {
          tt.error(err);
          tt.end();
        });
      });

      t.end();

    });

  });
};


/*
// Get all values that are related to the given field. Return an array of
// objects.
test('Get values for a field', function (t) {
  t.plan(1);
  var db = createDb('getVals');
  t.equal(typeof db.slogGetValues, 'function');
});


// Delete related values too
test('Delete a field', function(t) {
  t.plan(3);
  var db = createDb('node');
  db.slogDelField({ key: 'fielda' }, function(err) {
    t.error(err);
    var graph = levelgraph(db.sublevels.graph);
    graph.get({predicate: 'fielda'}, function(err, res) {
      t.error(err);
      t.equal(res.length, 0, 'Triple is gone');
    });
  });
});

// fetchNode
// Get a node by id. Returns an object with all metadata.

// fetchNodes
// Get array of nodes from levelgraph query. Like
// [{ index: '', name: '' }]
*/
