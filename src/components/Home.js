import React from 'react';
import Notes from './Notes';

const Home = () => {

    // const context = useContext(noteContext)
    // const { notes, setNotes } = context;

    return (
        <div className='container my-3'>
            <Notes/>
        </div>
    )
}

export default Home;