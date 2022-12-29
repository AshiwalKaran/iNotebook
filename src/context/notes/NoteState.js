import NoteContext from "./noteContext";
import { useState } from "react";
import React from 'react'

const NoteState = (props) => {
    const notesInitial=[
        {
          "_id": "63ac025793ac5ea66369ba67",
          "user": "63ac0014af7e4361a0e06f21",
          "title": "My title",
          "description": "hello world",
          "tag": "personal",
          "date": "2022-12-28T08:46:15.948Z",
          "__v": 0
        },
        {
          "_id": "63ac025893ac5ea66369ba69",
          "user": "63ac0014af7e4361a0e06f21",
          "title": "My title",
          "description": "hello world",
          "tag": "personal",
          "date": "2022-12-28T08:46:16.167Z",
          "__v": 0
        },
        {
          "_id": "63ac025893ac5ea66369ba6b",
          "user": "63ac0014af7e4361a0e06f21",
          "title": "My title",
          "description": "hello world",
          "tag": "personal",
          "date": "2022-12-28T08:46:16.907Z",
          "__v": 0
        }
      ];
      const [notes, setNotes] = useState(notesInitial);

      //Add a note
      const addNote=(title,description,tag)=>{
        //TO DO API CALL
        console.log('Adding a new note');
        const note={
          "_id": "63ac025893ac5ea66369ba69",
          "user": "63ac0014af7e4361a0e06f21",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-12-28T08:46:16.167Z",
          "__v": 0
        }
        setNotes(notes.concat(note));
      }

  return (
    //we are passing the state and update function to all the child components of Notestate
    <NoteContext.Provider value={{notes,setNotes,addNote}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState