const express = require("express");
const router = express.Router();

const Notes = require("../models/Notes.model");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /notes
router.get("/", isLoggedIn, (req, res) => {
  res.render("notes/notes");
});
// GET /notes/add
router.get("/add", isLoggedIn, (req, res) => {
  res.render("notes/add-notes");
});

// POST /notes 
router.post("/", (req, res) => {
  const { title, description } = req.body;

  Notes.create({ title: title, description: description }).then((response) => {
    res.redirect('/notes/notes')
  }).catch((error) => { 
    console.log(error)
    res.status(500).render("/notes/notes", {
      errorMessage:
        error
    });
  });
});

// PUT /notes
router.put("/", isLoggedIn, (req, res) => {
});

// DELETE /notes
router.delete("/", isLoggedIn, (req, res) => {
});

module.exports = router;
