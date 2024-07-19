// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Registration endpoint
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).send("Error registering user");
      return;
    }
    res.send("User registered successfully");
  });
});

// Login endpoint
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: "Error logging in" });
      return;
    }
    if (results.length > 0) {
      req.session.user = results[0]; // Store user info in session
      res.json({ success: true, username: username, userId: results[0].id });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// Logout endpoint
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out");
    } else {
      res.send("Logout successful");
    }
  });
});

// Submit a comment
router.post("/comment", (req, res) => {
  const { userId, content } = req.body;
  const query = "INSERT INTO comments (user_id, content) VALUES (?, ?)";
  db.query(query, [userId, content], (err, result) => {
    if (err) {
      console.error("Error inserting comment:", err);
      res
        .status(500)
        .json({ success: false, message: "Error submitting comment" });
      return;
    }
    res.json({ success: true, message: "Comment submitted successfully" });
  });
});

// Get all comments
router.get("/comments", (req, res) => {
  const query =
    "SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving comments:", err);
      res
        .status(500)
        .json({ success: false, message: "Error retrieving comments" });
      return;
    }
    res.json({ success: true, comments: results });
  });
});

router.get("/user", (req, res) => {
  if (req.session.user) {
    res.json({ userId: req.session.user.id }); // Assuming 'id' is the primary key in your 'users' table
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

module.exports = router;
