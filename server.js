const express = require('express');
const path = require('path');
const fs = require('fs');
const { application } = require('express');


const PORT = process.env.PORT || 3001;

const app = express();



// middleware for parsing JSON and URLencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
application.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET ROUTE for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);