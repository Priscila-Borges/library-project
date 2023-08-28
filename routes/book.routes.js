const express = require('express');
const BookModel = require('../models/Book.model');
const router = express.Router();

const Book = require("../models/Book.model")


/* GET /books */
router.get("/books", (req, res, next) => {
    Book.find()
        .then((booksFromDB) => {
            res.render("books/books-list", { books: booksFromDB });
        })
        .catch(e => next(e))
});

//GET /books/create
router.get("/books/create", (req, res, next) => {
    res.render("books/book-create");
})

//GET /books/:bookId
router.get("/books/:bookId", (req, res, next) => {

    Book.findById(req.params.bookId)
        .then(bookFromDB => {
            res.render("books/book-details", bookFromDB);
        })
        .catch(e => { next(e) });
});

//GET /books/edit
router.get("/books/create", (req, res, next) => {
    res.render("books/book-create");
});

// CREATE: process form
router.post("/books/create", (req, res, next) => {

    const newBook = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating
    };

    Book.create(newBook)
        .then( (newBook) => {
            res.redirect("/books");
        })
        .catch(e => { next(e) });
});



module.exports = router;
