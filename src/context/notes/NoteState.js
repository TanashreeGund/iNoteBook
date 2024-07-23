import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host="http://localhost:5000/api/notes"
    const notesInit=[]
      const [notes, setNotes] = useState(notesInit)

      // get All notes
      const getAllNotes=async ()=>{
        const response= await fetch(`${host}/fetchallnotes`,{
          method: "GET",
          headers: {
            'content-type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
          
        });
        const json= await response.json();
        setNotes(json)
        console.log(json);
      }

      //Add Note
      const addNote=async (title,description,tag)=>{
        const response= await fetch(`${host}/addnote`,{
          method: "POST",
          headers: {
            'content-type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify(title,description,tag)
        });
        const json= await response.json();
        console.log(json);
        getAllNotes();
      }

       //Delete Note
       const deleteNote= async(id)=>{
        const response= await fetch(`${host}/deletenote/${id}`,{
          method: "DELETE",
          headers: {
            'content-type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          }
        });
        const json= await response.json();

        console.log(json);
        getAllNotes();

       }

        //edit Note
      const editNote= async(id,title,description,tag)=>{
        // API call
        const response= await fetch(`${host}/updatenote/${id}`,{
          method: "PUT",
          headers: {
            'content-type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({title,description,tag})
        });
        const json= await response.json();
        console.log(json);
        getAllNotes();
        
        
    }
    
    return (
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState