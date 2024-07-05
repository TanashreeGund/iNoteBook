import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const notesInit=[
        {
          "_id": "6683c8aba7611312c4fa43e5",
          "user": "668123bbc21219ff96755378",
          "title": "My Title",
          "description": "Wake up early",
          "tag": "Personal",
          "Date": "2024-07-02T09:30:19.221Z",
          "__v": 0
        },
        {
          "_id": "6683c97b683f98cc09162360",
          "user": "668123bbc21219ff96755378",
          "title": "My Note",
          "description": "Wake up early",
          "tag": "Personal",
          "Date": "2024-07-02T09:33:47.397Z",
          "__v": 0
        },
        {
          "_id": "6683ca3814d6c6380faff60c",
          "user": "668123bbc21219ff96755378",
          "title": "My Title",
          "description": "Wake up early",
          "tag": "Personal",
          "Date": "2024-07-02T09:36:56.322Z",
          "__v": 0
        },
        {
          "_id": "6683cc5777999783701a5627",
          "user": "668123bbc21219ff96755378",
          "title": "My Note",
          "description": "Wake up early",
          "tag": "Personal",
          "Date": "2024-07-02T09:45:59.472Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInit)
    
    return (
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState