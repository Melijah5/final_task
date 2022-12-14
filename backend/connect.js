const mysql = require('mysql')


var mysqlConnection = mysql.createConnection({
    user: "taskDBuser",
    password: "taskDBuser",
    host: "127.0.0.1",
    database: "taskDB"
})

module.exports = mysqlConnection