const express = require("express");
const fs = require("fs");
const path = require("path"); //??

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


//require("./routes/htmlRoutes")(app);
//require("./routes/apiRoutes")(app);


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(getNotes);
});

app.post("/api/notes", (req, res) => {
    const note = req.body;
    fs.readFile("db/db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data)
        notes.push(note)
    });

});




app.listen(PORT, () => console.log(`App listening 'http://localhost:${PORT}'`));