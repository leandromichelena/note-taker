const fs = require("fs");
const path = require("path");

function getNotes() {
    let { notes } = JSON.parse(fs.readFileSync(
        path.join(__dirname, '../db/db.json'),
    ))
    return notes;
};

function createNote(body) {
    const newNote = body;
    let notesArray = getNotes();
    notesArray.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return newNote;
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function checkId(id){
    let notesArray = getNotes();
    notesArray.find(note => {
        if (note.id === id) {
            return true;
        }
        return false;
    });
};

function deleteNote(id) {
    let notesArray = getNotes();
    let newNotesArray = notesArray.filter((note) => note.id !== id);
    
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: newNotesArray }, null, 2)
    );

    return newNotesArray;
};

module.exports = {
    getNotes,
    createNote,
    validateNote,
    checkId,
    deleteNote
};