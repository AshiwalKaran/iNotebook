import NoteContext from "./noteContext";

import React from 'react'

const NoteState = (props) => {
    //created a new state s1
    const s1={
        "name":"Karan",
        "class":"5a"
    }

  return (
    //we are passing the state s1 to all the child components of Notestate
    <NoteContext.Provider value={s1}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState