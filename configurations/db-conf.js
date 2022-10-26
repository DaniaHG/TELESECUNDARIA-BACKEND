const mysql = require('mysql');

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('En linea...');
  }
});

module.exports = mysqlConnection;