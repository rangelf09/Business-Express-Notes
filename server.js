const express = require('express');
const path = require('path');
const fs = require('fs');
const { application } = require('express');


const PORT = process.env.PORT || 3001;
const app = express();


const data = fs.readFileSync('./db/db.json');
const db = JSON.parse(data);


// middleware for parsing JSON and form data
app.use(express.json());
app.use(express.static('public'));

const newJSON = (topic,response ) => {
    let dbArray = db;
    let output = {}; 
    output.id = Date.now();
    output.title = topic.title;
    output.text = topic.text; 
    dbArray.push(output);
    dbArray = JSON.stringify(dbArray);
    response.JSON(fs.writeFileSync('./db/db.json', dbArray, (err) => {console.log(err)}))
};

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET ROUTE for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(db));

app.get('api/notes', (req, res) => newJSON(req.body, res));


app.listen(PORT, () => 
    console.log(`App listening on PORT ${PORT} `)
);

console.log(db);