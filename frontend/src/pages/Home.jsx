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
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                // getNotes();
                removeNote(id)
            })
            .catch((error) => alert(error));
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
            </NoteContext.Provider>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>

            
            
            {/* <div className="form-section"> */}
            {/* <div className="popup">
            <div className="popup-inner">
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
            <button >Close</button>
            </div>
            </div> */}
            
        </div>
        </div>
    );
}

export default Home;