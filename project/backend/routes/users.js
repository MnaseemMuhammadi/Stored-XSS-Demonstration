// users.js
const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
