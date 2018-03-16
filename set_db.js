var sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./db/myDB.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.run('CREATE TABLE users(username text, password text, ip_address text, is_active boolean)');

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
