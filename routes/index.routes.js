const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  let username = "";

  if (req.session.currentUser) {
    username = "Bienvenido/a, " + req.session.currentUser.username;
  }

  res.render("index", { title: "Mi gran APP", isLogin: req.session.currentUser ? true : false, username: username });
});

module.exports = router;
