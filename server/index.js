const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require('cors')

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "chicago_tickets",
});

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get/tickets", (req, res) => {
  const query = "SELECT * FROM Ticket LIMIT";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/api/get/zipcodes", (req, res) => {
  const query = "SELECT * FROM ZipCode";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
