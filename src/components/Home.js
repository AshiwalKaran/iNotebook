import React from 'react';
import Notes from './Notes';

const Home = (props) => {

    // const context = useContext(noteContext)
    // const { notes, setNotes } = context;

    return (
        <div className='container my-3'>
            <Notes showAlert={props.showAlert}/>
        </div>
    )
}

export default Home;