const { getNotes, createNote, validateNote, checkId, deleteNote } = require('../../lib/notes');

const router = require('express').Router();

// imports function to generate unique user ids
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    let results = getNotes();
    res.json(results);
});

router.post('/notes', (req, res) => {
    // req.body is where our incoming content will be

    // uses uuid to generate an unique random id for the new note
    req.body.id = uuidv4();

    // checks the data through the validate function
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    }
    else {
        // add note to json file and notes array in this function
        const note = createNote(req.body);

        res.json(note);
    }
});

router.delete("/notes/:id", (req, res) => {
    if (checkId(req.params.id)){
    res.status(400).send('Error. This note does not exist.');
    }
    else {
        const newNotesArray = deleteNote(req.params.id);
        
        res.json(newNotesArray);
    }
});

module.exports = router;