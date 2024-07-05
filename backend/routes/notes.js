const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { findByIdAndUpdate } = require('../models/User');

// Route 1: Get all the notes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
        return;
    }
    
});

// Route 2: Add new notes using:POST:"/api/notes/addnote"
router.post('/addnote', fetchUser, [
    body('title', "Enter a valid title of 3 characters").isLength({ min: 3 }),
    body('description', "Enter a valid description of 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    //if there are errors return bad request and error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //destructuring
        const { title, description, tag } = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
        return;
    }
   
});

// Route 3: Update Note
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // create a new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated

        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found");  return;}

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
        return;
    }
    
});

// Route 4: Delete existing Note 
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {

        // find the note to be deleted

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        // delete the note only if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "success": "Note has been deleted", "note": note });


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
        return;
    }
    
});

module.exports = router