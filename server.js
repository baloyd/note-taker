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
app.use(express.static('public'));



//When /notes is navigated to, the contents of the notes.html file will be displayed.
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

//reads the information from the db.json file, parses the information and sends the information.
app.get('/api/notes', function(req, res) {
    fs.readFile('db/db.json', (err, data) => {
      if (err) {
      throw err;}
      JSON.parse(data);
      res.send(data);
    });
  });

  //places inputted information into notes variable.
  app.post('/api/notes', function(req, res) {
    const newNote = req.body;

    //reads db.json file, parses information and pushes notes variable into the file.
    fs.readFile('db/db.json', (err, data) => {
      if (err) throw err;
      parsedData = JSON.parse(data);
      parsedData.push(newNote);
      parsedData.forEach((note, index)=>{
        note.id= 1
        note.id++;
        return parsedData;
      })
      res.json(newNote);
     
      

      //converts the json information to strings and then writes it to the page
      stringData = JSON.stringify(parsedData);

      fs.writeFile('db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    
  });
  
//Sets default path to the contents of the index.html file.
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));