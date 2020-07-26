const express = require("express");
const fs = require("fs");
const path =require("path");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));



app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data)
       res.json(notes);
  });
});



app.post("/api/notes", (req, res) => {
    const note = req.body;
    const id = parseInt(req.params.id);
    
    fs.readFile("db/db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data)
        notes.id = notes.length -1;
        notes.push(note)


    fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json(note);
      });
    });
    

});

app.delete("/api/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    fs.readFile("db/db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        
        notes.splice(id, 1)

        notes.forEach(function(item, index){
            item.id = index;
        });
    
    fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.send(true);

      });
    });
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


app.listen(PORT, () => {console.log(`App listening 'http://localhost:${PORT}'`)
});