import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import CreateNoteButton from "../components/CreateNoteButton"
import "../styles/Home.css"
import { createContext } from 'react';

export const NoteContext = createContext(null);


function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    
    

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                // console.log(data);
            })
            .catch((err) => alert(err));
    };

    const removeNote =(index)=> {
        let newNoteList =notes.filter((element,i) =>element.id!==index) 
        setNotes(newNoteList)
    }

    const deleteNote = (id) => {
        if(!id){
            alert("somthing went wrong! please refresh the the page and try again.");
        }
        else{
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                // getNotes();
                removeNote(id)
            })
            .catch((error) => alert(error));
        }
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
                
            })
            .catch((err) => alert(err));
    };

    return (
        
        <div className="container">
            <div className="home-container">
            <div className="notes-section">
                
            <NoteContext.Provider value={[notes, setNotes]}>
                <h2>Notes <CreateNoteButton /></h2>
            
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
                </NoteContext.Provider>
            
            </div>

            
            
           
            
        </div>
        </div>
    );
}

export default Home;