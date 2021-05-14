// Dependencies
const express = require("express")
const path = require("path")
const fs= require("fs");


// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 9000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Sets default path to the contents of the index.html file.
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//When /notes is navigated to, the contents of the notes.html file will be displayed.
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));