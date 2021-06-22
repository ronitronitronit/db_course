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
  const query = "SELECT * FROM Ticket";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/api/get/zipcodes", (req, res) => {console.log('got here!!!')
  const query = "SELECT * FROM zipcode ORDER BY low_income_ratio ";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.get("/api/get/blorg", (req, res) => {console.log('got here!!!')
  const query = "SELECT * FROM zipcode ORDER BY low_income_ratio ";
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
