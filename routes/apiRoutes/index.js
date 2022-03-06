const router = require('express').Router();
const notes = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');
const {validateNote, createNote} = require('../../lib/notes');

router.get('/notes', (req,res) => {    
    let results = notes;
    
    res.json(results);
});

router.post('/notes', (req,res) => {
    // creating a random unique ID and assigning it to 'uniqueId'
    req.body.Id = uuidv4();
    
    if(!validateNote(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const newNote = createNote(req.body, notes);
        res.json(newNote);
    }    

})

module.exports = router;