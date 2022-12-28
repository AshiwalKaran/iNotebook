import React from 'react';
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';

const About = () => {
    const a =useContext(noteContext);
  return (
    <div>This is About {a.name} of class {a.class}</div>
  )
}

export default About;