var tests = require('../');

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
