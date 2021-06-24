const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const { notes } = require('./db/db.json')




app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.listen(PORT, console.log(`Now listening on ${PORT}!`));

