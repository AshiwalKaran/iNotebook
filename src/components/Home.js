import React from 'react';
import AddNote from './AddNote';
// import noteContext from '../context/notes/noteContext';
import Notes from './Notes';

const Home = () => {

    // const context = useContext(noteContext)
    // const { notes, setNotes } = context;

    return (
        <div className='container my-3'>
            <AddNote/>
            <Notes/>
        </div>
    )
}

export default Home;