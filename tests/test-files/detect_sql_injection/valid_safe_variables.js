var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "password",
  database: "my_db"
});

// variable with hard coded input
const phone = '11 22 33 44';

const sql = 'SELECT * FROM users WHERE tlf = ' + phone;

// connect to the database
dbConnection.connect();

// execute query
dbConnection.query(sql, (err, result) => console.log(result));
