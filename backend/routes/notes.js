const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const fetchuser =require('../middleware/fetchuser');

// Route 1 --> Get all the notes using :GET "/api/notes/fetchallnotes".Login of user is required that is why we are using fetchuser middleware to check whether user id loggedin or not.

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes=await Note.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
});

//Route 2 --> Add a new Note using :POST "/api/notes/addnote".login of user is required.

router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5})
],async(req,res)=>{
    const {title,description,tag}=req.body;
    //if there are errors return Bad request and the errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const note=new Note({
            user:req.user.id,title,description,tag
        });
        const savedNote=await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
});


//Route 3 --> Update an existing Note using :POST "/api/notes/updatenote" and using the ID \of the note.

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    //if there are errors return Bad request and the errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        //create a new Note
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        //Find the note that needs to be updated 
        let note=await Note.findById(req.params.id);
        if(!note){return res.status(404).send('Not found')};

        if(note.user.toString()!==req.user.id){
            return res.status(401).send('Not allowed');
        }
        note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});

        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
});

//Route 4--> Delete an existing Note using :DELETE "/api/notes/deletenote".Login of user is required.

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{

    try {
        //Find the note that needs to be deleted.

        let note=await Note.findById(req.params.id);
        //If note is not present
        if(!note){return res.status(401).send('Not found');}

        //If note is present check whether the owner of the note is same as the logged in one
        if(note.user.toString()!==req.user.id){return res.status(401).send("Not allowed");}

        //If the user is same as the owner of the note
        note=await Note.findByIdAndDelete(req.params.id);
        res.json({'Success':'Note has been deleted'});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }

});

module.exports = router;