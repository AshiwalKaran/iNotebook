import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
  const context=useContext(noteContext);
  const {addNote}=context;
  
  //State definition for Note
  const [note, setNote] = useState({
    title:'',description:'',tag:''
  });

  //Handleclick function fires when we try to add a Note from frontend
  const handleClick=(event)=>{
    event.preventDefault(); //to prevent the form to reload
    addNote(note.title,note.description,note.tag);
  }

  //Onchange function -->The onchange event occurs when the value of an element has been changed.Onchange allows us to write in the inputs.
  const onChange=(event)=>{
    setNote({...note,[event.target.name]:event.target.value});
  }


  return (
    <div className='my-3'>
        <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" value={note.title} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<3} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
    </div>
  )
}

export default AddNote