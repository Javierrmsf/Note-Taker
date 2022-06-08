const express = require("express");

const path = require("path");

const fs = require("fs");


//starting up express

const app = express();

const PORT = process.env.PORT || 3001;

////////



app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static("public"))

////////
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
   });

   ///route to index page 

app.get("/notes", function(req, res) {
 res.sendFile(path.join(__dirname, "/public/notes.html"));
});
   ///route to notes

app.get("/api/notes", function(req, res){
 res.sendFile(path.join(__dirname, "/db/db.json"));
});
   //route to get stored notes from db




   

