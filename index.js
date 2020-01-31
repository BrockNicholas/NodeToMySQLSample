//// = (Uncomment these lines for use in AWS Lambda function)

var mysql = require('mysql');
var config = require('./config/conn.json');

var pool  = mysql.createPool({
    host     : config.dbhost,
    user     : config.dbuser,
    password : config.dbpassword,
    database : config.dbname
  });
  // Can use process.env.VAR_NAME instead of config file in AWS Lambda
  // if you prefer setting environment variables that way. But this way works for
  // Lambda and other platforms as well

//// exports.handler = (event, context, callback) => {
  pool.getConnection(function(err, connection) {
    // Use the connection
    //// context.callbackWaitsForEmptyEventLoop = false;
    connection.query('SELECT * from test', function (error, results, fields) {
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      else console.log(results);
      //// callback(null, results);
      process.exit();
    });
  });
//// }