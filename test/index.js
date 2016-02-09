var test = require('tape');
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
