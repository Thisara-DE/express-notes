const router = require('express').Router();
const { notes } = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');
const {validateNote, createNote, findById, deleteNote} = require('../../lib/notes');

router.get('/notes', (req,res) => {    
    let results = notes;
    
    res.json(results);
});

router.post('/notes', (req,res) => {
    // creating a random unique ID and assigning it to 'uniqueId'
    req.body.id = uuidv4();
    
    if(!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const newNote = createNote(req.body, notes);
        res.json(newNote);
    }    

});

router.delete('/notes/:id', (req, res) => {
    const newNotes = deleteNote(req.params.id, notes);
    

    if(newNotes) {        
        res.json(newNotes);
    } else {
        res.status(400).send("The note ID doesn't exist");
    }
});

module.exports = router;