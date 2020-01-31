var mysql = require('mysql');
var config = require('./config/conn.json');

var pool  = mysql.createPool({
    host     : config.dbhost,
    user     : config.dbuser,
    password : config.dbpassword,
    database : config.dbname
  });


  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query('SELECT * from test', function (error, results, fields) {
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      else console.log(results);
      process.exit();
    });
  });