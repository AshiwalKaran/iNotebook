import React,{useContext,useEffect} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

const Notes = () => {
  const context= useContext(noteContext);
  const {notes,getNotes}=context;

  useEffect(() => {
   getNotes();
   // eslint-disable-next-line
  }, [])
  
  
  return (
    <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note,index)=>{
            return <Noteitem note={note} key={index}/>
        })}
    </div>
  )
}

export default Notes