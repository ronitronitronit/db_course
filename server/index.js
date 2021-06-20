const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "chicago_tickets",
});

app.get("/", (req, res) => {
  const query = "SELECT * FROM Ticket LIMIT 3";
  db.query(query, (err, result) => {
    if (err) {
        console.log(err)
    }
    console.log(result);
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
