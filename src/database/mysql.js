// const { promisify } = require("util");
const mysql2 = require("mysql2");
const {db_dev} = require("../config/dbConfig");

const pool = mysql2.createPool({
  host: db_dev.host,
  user: db_dev.user,
  password: db_dev.password,
  database: db_dev.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
  }
  if (connection) connection.release();
  console.log("MySQl is Connected!");

  return connection;
});

// pool.query = promisify(pool.query);

module.exports = pool;
