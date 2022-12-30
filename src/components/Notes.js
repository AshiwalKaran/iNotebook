import React, { useContext, useEffect, useRef ,useState} from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);      //Ref to open the modal
  const refClose = useRef(null); //Ref to close the modal

  const [editedNote, setEditedNote] = useState({ id: '', editedTitle: '', editedDescription: '', editedTag: 'default' });

  //Update function

  const updateNote = (currentNote) => {
    ref.current.click();  //To open the modal
    setEditedNote({ id: currentNote._id, editedTitle: currentNote.title, editedDescription: currentNote.description, editedTag: currentNote.tag });
  }
  const handleClick = (event) => {
    refClose.current.click(); //To close the Modal

    // console.log(editedNote.id);
    // event.preventDefault();

    //Calling the editNote function to update the note in the backend
    editNote(editedNote.id, editedNote.editedTitle, editedNote.editedDescription, editedNote.editedTag);
  }

  const onChange = (event) => {
    setEditedNote({ ...editedNote, [event.target.name]: event.target.value });
  }

  return (
    <>
      <AddNote />
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="editedTitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="editedTitle" name="editedTitle" value={editedNote.editedTitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedDescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="editedDescription" name="editedDescription" value={editedNote.editedDescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedTag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="editedTag" name="editedTag" value={editedNote.editedTag} onChange={onChange} minLength={3} required />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={editedNote.editedTitle.length<5 || editedNote.editedDescription.length<5 || editedNote.editedTag.length<3} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem note={note} key={note._id} updateNote={updateNote} />
        })}
      </div>
    </>
  )
}

export default Notes