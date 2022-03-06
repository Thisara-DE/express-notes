const fs = require("fs");
const path = require("path");

function validateNote(newNote) {
    if(!newNote.title || typeof newNote.title !== 'string') {
        return false;
    }
    if (!newNote.text || typeof newNote.text !== 'string') {
        return false;
    }    
    return true;
}

function createNote(body, notes) {
    const newNote = body;

    notes.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes}, null, 2)
    );

    return newNote;
}

module.exports = {validateNote, createNote};