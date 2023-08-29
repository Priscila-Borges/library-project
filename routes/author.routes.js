const express = require('express');
const BookModel = require('../models/Book.model');
const router = express.Router();

const Book = require("../models/Book.model")
const Author = require("../models/Author.model");

//GET /author 
router.get("/authors", (req, res, next) => {
    Author.find()        
        .then((authorsFromDB) => {
            res.render("authors/authors-list", { authors: authorsFromDB });
        })
        .catch(e => next(e))
});

module.exports = router;