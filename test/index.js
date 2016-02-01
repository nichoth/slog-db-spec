var methods = require('../methods.js');

module.exports = function(test, fixture) {
  test('Methods exist', function(t) {
    fixture.setup(test, function(err, db) {
      t.error(err);
      Object.keys(methods).forEach(function(method) {
        t.ok(db[method], 'db has method ' + method);
      });
      fixture.teardown(test, db, function(err) {
        t.error(err);
        t.end();
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

test('Put a node', function(t) {
  t.plan(1);
  var db = createDb('node');
  db.slogPutNode([
    {field: 'name', value: 'a'},
    {field: 'a', value: 'b'}
  ], function(err) {
    t.error(err);
  });
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

// putNode
// Take an object and put it in the db with the right indexes.

// fetchNodes
// Get array of nodes from levelgraph query. Like
// [{ index: '', name: '' }]
*/
