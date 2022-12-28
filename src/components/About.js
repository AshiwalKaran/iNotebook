import React from 'react';
import noteContext from '../context/notes/noteContext';
import { useContext,useEffect } from 'react';

const About = () => {
    //applying 'useContext' method
    const a =useContext(noteContext);
    useEffect(() => {
      a.update();
    }, [])
    
  return (
    <div>This is About {a.state.name} of class {a.state.class}</div>
  )
}

export default About;