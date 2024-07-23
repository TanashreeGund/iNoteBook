import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate} from "react-router-dom";
const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getAllNotes,editNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            
        getAllNotes(); 
        }
        else{
            navigate("/login");
        }
        //eslint-disable-next-line
    }, []);
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});
    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currnote) => {
        ref.current.click();
        setNote({id:currnote._id, etitle:currnote.title, edescription:currnote.description, etag:currnote.tag});
   }

    const handleClick = (e) =>{
        e.preventDefault();
        //call->NoteState.editNote
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("Note Updated Successfully",'success');
    }

    
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="textbox" className="form-control" id="edescription" name="edescription"
                    value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tag Name</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                </div>
                
            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal" >Close</button>
                            <button  disabled={note.etitle.length<5 || note.edescription.length<5}type="button" className="btn btn-primary"  onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>  
            </div>
            <div className="row my-3">
                <h2>Your Note</h2>
                <div className="d-flex justify-content-center">
                {notes.length===0 && "No Notes Available"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
                })}
            </div>
        </>
    )
}

export default Notes