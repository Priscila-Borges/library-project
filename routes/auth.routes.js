const express = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');

const router = express.Router();

const saltRounds = 10;

// GET /signup (display form)
router.get("/signup", (req, res, next) => {
  res.render("auth/signup")
});

// POST /signup (process form)
router.post("/signup", (req, res, next) => {
  /*
  
  x get data from "req.body"
  x generate salt
  x generate hash
  x prepare an object
  x User.create(obj)
  
  */

  const { email, password } = req.body;

  bcryptjs.genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hash => {
      const newUser = {
        email: email,
        passwordHash: hash
      }

      return User.create(newUser);
    })
    .then(userFromDB => {
      res.redirect("/user-profile")
    })
    .catch(error => {
      console.log("error creating user account... ", error);
      next(error);
    })
});

router.get("/user-profile", (req, res, next) => {
  res.render("auth/user-profile");
})


module.exports = router;
