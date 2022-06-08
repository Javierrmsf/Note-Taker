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

////////GET
app.get("/", function(req, res) {
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



 /////POST
app.post("/api/notes", function(req, res){
    let newnote = req.body;
    let storednotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let nl =(storednotes.length).toString();

    newnote.id = nl;
    
    storednotes.push(newnote);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(storednotes));
     res.json(storednotes);

});

///////DELETE METHOD


app.delete("/api/notes/:id", function(req, res){


    let storednotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    let id = req.params.id - 1

    storednotes.splice(id, 1);
    


    fs.writeFileSync("./db/db.json", JSON.stringify(storednotes));
    res.json(storednotes);

});




//////





   app.listen(PORT, () => console.log("listening at " + PORT));