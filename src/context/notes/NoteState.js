import NoteContext from "./noteContext";
import { useState } from "react";
import React from 'react'

const NoteState = (props) => {
    //created a new state s1
    const s1={
        "name":"Karan",
        "class":"5a"
    }
    const [state, setState] = useState(s1);

    const update=()=>{
        setTimeout(()=>{
            setState({
                "name":"Akash",
                "class":"10a"
            })
        },2000)
    }

  return (
    //we are passing the state and update function to all the child components of Notestate
    <NoteContext.Provider value={{state,update}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState