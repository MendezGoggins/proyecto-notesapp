const express = require("express");
const router = express.Router();

const Notes = require("../models/Notes.model");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /notes 
router.get("/", isLoggedIn, (req, res) => {
  let username = "";

  if (req.session.currentUser) { // <- mismo cógido que en index.routes.js para que se vea el "bienvenido [nombre usuario]"
    username = "Bienvenido/a, " + req.session.currentUser.username;
  }
  Notes.find({ user: req.session.currentUser._id })
    .then((resultsdb) => {
      res.render("notes/notes", { notes: resultsdb, isLogin: true, username: username } /* <- Que lo meta en "resultsdb" que hemos creado */);
    })
    .catch(err => {
      console.log('Se ha producido un error', err)
    })

  /* ^^^ notas.find(): en el .then rendearé un array con todas las notas que están en la db, pero antes, con el parámetro {user: req.session.currentUser._id} le estamos pidiendo que solo renderice las del usuario actual
  */

});
// GET /notes/add
router.get("/add", isLoggedIn, (req, res) => {
  let username = "";

  if (req.session.currentUser) { // <- mismo cógido que en index.routes.js para que se vea el "bienvenido [nombre usuario]"
    username = "Bienvenido/a, " + req.session.currentUser.username;
  }
  res.render("notes/add-notes", { isLogin: true, username: username });
});

// POST /notes 
router.post("/", (req, res) => {
  const { title, description } = req.body;

  Notes.create({ user: req.session.currentUser._id, title: title, description: description }).then((response) => {
    res.redirect('/notes')
  }).catch((error) => {
    console.log(error)
    res.status(500).render("/notes/notes", {
      errorMessage:
        error
    });
  });
});

// PUT /notes/edit/:id  
router.get("/edit/:id", (req, res) => {
  Notes.findById(req.params.id).then((note) => {

    let username = "";
 
    if (req.session.currentUser) { // <- mismo cógido que en index.routes.js para que se vea el "bienvenido [nombre usuario]"
      username = "Bienvenido/a, " + req.session.currentUser.username;
    }
    res.render("notes/edit-notes", { note: note, isLogin: true, username: username });
  })
});

// POST /notes/edit/:id
router.post("/edit/:id", (req, res) => {
  const { title, description } = req.body;
 
  Notes.updateOne({ _id: req.params.id }, { user: req.session.currentUser._id, title: title, description: description }).then((response) => {   
    res.redirect('/notes')
  }).catch((error) => {
    console.log(error)
    res.status(500).render("/notes/notes", {
      errorMessage:
        error 
    });
  });
});

// DELETE /notes/delete/:id
router.post("/delete/:id", (req, res) => {   // <- Como delete no tiene body, tenemos que hacer esto
  Notes.deleteOne({ _id: req.params.id }).then((response) => {
    res.redirect('/notes')
  }).catch((error) => {
    console.log(error)
    res.status(500).render("/notes/notes", {
      errorMessage:
        error
    });
  });
});

module.exports = router;
