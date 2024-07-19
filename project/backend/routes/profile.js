// profile.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Update profile
router.post("/update", (req, res) => {
  const { fullName, bio, website } = req.body;
  // Assuming you have a user ID in the session
  const userId = req.session.user ? req.session.user.id : 1; // Use a default ID for demonstration

  const query =
    "INSERT INTO user_profiles (user_id, full_name, bio, website) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE full_name = ?, bio = ?, website = ?";
  db.query(
    query,
    [userId, fullName, bio, website, fullName, bio, website],
    (err, result) => {
      if (err) {
        console.error("Error updating profile:", err);
        res
          .status(500)
          .json({ success: false, message: "Error updating profile" });
        return;
      }
      res.json({ success: true, message: "Profile updated successfully" });
    }
  );
});

// Get profile
router.get("/get", (req, res) => {
  // Assuming you have a user ID in the session
  const userId = req.session.user ? req.session.user.id : 1; // Use a default ID for demonstration

  const query =
    "SELECT full_name, bio, website FROM user_profiles WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error retrieving profile:", err);
      res
        .status(500)
        .json({ success: false, message: "Error retrieving profile" });
      return;
    }
    if (results.length > 0) {
      res.json({ success: true, profile: results[0] });
    } else {
      res.json({ success: false, message: "Profile not found" });
    }
  });
});

module.exports = router;
