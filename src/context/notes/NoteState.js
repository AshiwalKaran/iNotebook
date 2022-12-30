import NoteContext from "./noteContext";
import { useState } from "react";
import React from 'react'

const NoteState = (props) => {

  //HOST
    const host="http://localhost:5000";
    const notesInitial=[];
      const [notes, setNotes] = useState(notesInitial);

      //Get All notes
      const getNotes=async()=>{
        //API CALL
        const url=`${host}/api/notes/fetchallnotes`;
        const response=await fetch(url,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'auth-token':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzAwMTRhZjdlNDM2MWEwZTA2ZjIxIn0sImlhdCI6MTY3MjIxNjU5Nn0.5dwDU6f-c3gOUK3Ca7E4nHfrycoKxH8P8h4ueLv2il0'
          }
        });

        const json=await response.json();
        setNotes(json);
      }

      //Add a note
      const addNote=async(title,description,tag)=>{
        //API CALL
        const url=`${host}/api/notes/addnote`;
        const response=await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzAwMTRhZjdlNDM2MWEwZTA2ZjIxIn0sImlhdCI6MTY3MjIxNjU5Nn0.5dwDU6f-c3gOUK3Ca7E4nHfrycoKxH8P8h4ueLv2il0'
          },
          body:JSON.stringify({title,description,tag}) //contains the new edited Note
        });

        console.log('Adding a new note');
        const note=await response.json();
        setNotes(notes.concat(note));
      }

      //Delete a Note
      const deleteNote=async(id)=>{
        //API CALL
        const url=`${host}/api/notes/deletenote/${id}`;
        const response=await fetch(url,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzAwMTRhZjdlNDM2MWEwZTA2ZjIxIn0sImlhdCI6MTY3MjIxNjU5Nn0.5dwDU6f-c3gOUK3Ca7E4nHfrycoKxH8P8h4ueLv2il0'
          },
          body: JSON.stringify()
        });
        const json=response.json();
        console.log(json);

        console.log('Deleting the note with id: '+id);
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }

      //Edit a Note
      const editNote=async(id,title,description,tag)=>{

        //API CALL
        const url=`${host}/api/notes/updatenote/${id}`;
        const response=await fetch(url,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzAwMTRhZjdlNDM2MWEwZTA2ZjIxIn0sImlhdCI6MTY3MjIxNjU5Nn0.5dwDU6f-c3gOUK3Ca7E4nHfrycoKxH8P8h4ueLv2il0'
          },
          body:JSON.stringify({title,description,tag}) //contains the new edited Note
        });
        const json=response.json();

        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id===id){
            element.title=title;
            element.description=description;
            element.tag=tag;
          }
        }
      }

  return (
    //we are passing the state and update function to all the child components of Notestate
    <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState