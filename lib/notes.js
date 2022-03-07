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

function findById(id, notes) {    
    const result = notes.filter(note => note.id === id);
    return result;
}

function deleteNote(id, notes) {    
    
    const indexToDelete = notes.findIndex(note => note.Id === id);

    if(indexToDelete >= 0) { const newNotes = notes.splice(indexToDelete, 1);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes}, null, 2)
    );

    return notes;

    } else {
        return;
    }    
}

module.exports = {validateNote, createNote, findById, deleteNote};