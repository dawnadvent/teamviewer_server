const express = require('express')
const app = express()
var sqlite3 = require('sqlite3').verbose()
var is_connected = false;
let db = new sqlite3.Database('./db/myDB.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  console.log(req.params)

  res.send('Hello World!')
})
app.post('/register', function (req, res) {

  var user_data = [req.body.username,req.body.password, req.body.ip_address, true]
  console.log(user_data)
  console.log(req.body)
  insert_user(user_data)
  res.send('Got a POST request')
})

app.post('/login', function (req, res) {
  console.log(req.body.username)
  var user_data = [req.body.username,req.body.password, req.body.ip_address]
//TODO: make a check_credentials function
  var auth = check_credentials(user_data)
  if(auth != 0){
      console.log("authentication error " +  auth);
      res.send("authentication error: " + auth);
      is_connected = false;
  }else{
    is_connected = true;
  }

  res.send('Got a POST request')
})
app.post('/connect', function(req, res){
  console.log("got connect POST request");
  var user_data = [req.body.username,req.body.password];
  //TODO: get the ip adress from the username
  if(user_active(user_data)){
    var ip_address = {"ip":get_ip_from_user(user_credentials)};
    res.send(JSON.stringfy(ip_address))
  }else{
    res.send("user is inactive")
  }

});

app.put('/disconnect', function (req, res) {
  console.log("disconnectiong");
  res.send('disconnected')
})
app.put('/user', function (req, res) {

  res.send('Got a PUT request at /user')
})
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))

function check_credentials(user_data){
  //check the user login data
  return 0;
}

function get_ip_from_user(user_credentials){
  //get the mac adress for this user
}

function insert_user(user_data){
  db.run(`INSERT INTO users(username, password, ip_address, is_active) VALUES(?, ?, ?, ?)`, user_data, function(err) {
   if (err) {
     return console.log(err.message);
   }
   console.log("inserted user to db")
   // get the last insert id
   //console.log(`A row has been inserted with rowid ${this.lastID}`);
 });
}
