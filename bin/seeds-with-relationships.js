const mongoose = require('mongoose');
const Book = require('../models/Book.model');
const Author = require('../models/Author.model');

require('dotenv').config(); // import and configure dotenv (loads environment variables from .env file)


const books = [
    {
        title: "The Hunger Games",
        description:
            "The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the voice of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America. The Capitol, a highly advanced metropolis, exercises political control over the rest of the nation. The Hunger Games is an annual event in which one boy and one girl aged 12–18 from each of the twelve districts surrounding the Capitol are selected by lottery to compete in a televised battle royale to the death.",
        rating: 10,
        author: "Suzanne Collins"
    },
    {
        title: "Harry Potter v.1 (Harry Potter and the Philosopher's Stone)",
        description:
            "Harry Potter v1",
        rating: 9,
        author: "J.K. Rowling"
    },
    {
        title: "Harry Potter v.2 (The Chamber Of Secrets)",
        description:
            "Harry Potter v2",
        rating: 9,
        author: "J.K. Rowling"
    }
];


const authors = [
    {
        name: "Suzanne Collins",
        age: 40,
        country: "US"
    },
    {
        name: "J.K. Rowling",
        age: 50,
        country: "UK"
    }
];




async function seedData() {
    try {

        /* CONNECT */
        const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library-project';
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`Connected to Mongo! Database name: "${conn.connections[0].name}"`);


        /* DELETE EXISTING DATA */
        const deletedBooks = await Book.deleteMany({}); //WARNING: this will delete all books in your DB !!
        const deletedAuthors = await Author.deleteMany({}); //WARNING: this will delete all authors in your DB !!
        console.log(deletedBooks, deletedAuthors);


        /* Seed authors */
        const authorsCreated = await Author.insertMany(authors);
        console.log(`Number of authors created... ${authorsCreated.length} `);


        /* Seed books */
        /* (for each book, we need to find the objectId of its author) */

        const booksWithIds = []; //will be an array of objects (each object contains the details of a book, including the author id)

        for(const bookObj of books){
            const authorName = bookObj.author;
            const authorDetails = await Author.findOne({name: authorName});
            const authorId = authorDetails._id;

            const newBook = {
                title: bookObj.title,
                description: bookObj.description,
                rating: bookObj.rating,
                author: authorId
            }

            booksWithIds.push(newBook);
        }


        const booksCreated = await Book.insertMany(booksWithIds);
        console.log(`Number of books created... ${booksCreated.length} `);


        /* CLOSE DB CONNECTION */
        mongoose.connection.close();

    } catch (e) {
        console.log("error seeding data in DB....", e)
    }
}

seedData();