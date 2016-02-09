# slog db spec

Spec for slog db.

## example

```js
var tests = require('slog-db-spec');

// called before every test
// should return an empty db
function createDb(done) {
  done(null, someDb);
}

// called after every test
// can be used to delete db
function teardown(db, done) {
  db.close();
  done(null);
}

tests(createDb, teardown);
```

## slog methods

```js
module.exports = {
  getValues: { type: 'async' },
  fetchNode: { type: 'async' },
  putNode: { type: 'async' },
  fetchNodes: { type: 'async' },
  putField: { type: 'async' },
  delField: { type: 'async' },
  putValue: { type: 'async' },
  delValue: { type: 'async' },
  delNode: { type: 'async' }
};
```
