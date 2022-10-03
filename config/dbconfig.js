const mysql = require("mysql");


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "digital_library",
});
db.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log("databaase connection sucessful 💕✔👍");
    console.log('Connected as id ' + db.threadId);
});
module.exports = db;
