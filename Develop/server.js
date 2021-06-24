const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notes = require('./db/db.json')

function createNote(body, notes) {
    let noteText = body;
    console.log(notes)
    console.log(noteText)
    notes.push(noteText);

    fs.writeFileSync(
        path.join(
            __dirname, './db/db.json'),
            JSON.stringify({ notes : noteText }, null, 1)
    )
    return noteText;
};

function noteValidation(noteText) {
    if(!noteText.title || typeof noteText.title !== "string") {
        return false
    } 
    if (!noteText.text || typeof noteText.text !== "string") {
        return false
    }
    return true
};

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();

    if(!noteValidation(req.body)) {
        res.status(400).send('Please format your note properly.');
    }
    else {
       let newNote = createNote(req.body, notes);
       res.json(newNote);
 }
});

app.delete('/api/notes/:id', (req, res) => {
    let noteId = req.body.id;
    let deletedNote;

    notes.map((element, index) => {
        if (element.id == noteId) {
            deletedNote = element,
            notes.splice(index, 1)
            return res.json(deletedNote)
        }
    });
});



app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.listen(PORT, console.log(`Now listening on ${PORT}!`));

