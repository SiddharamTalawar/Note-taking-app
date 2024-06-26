import React,{useState,useEffect,useContext} from "react";
import api from "../api";
// import { getNotes } from "../pages/Home";
import "../styles/PopupForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {NoteContext} from '../pages/Home'


function PopupForm(props) {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useContext(NoteContext);
   
    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                props.toggle();
                // console.log("1")
                let newNote = { content, title };
                setNotes(t =>[newNote,...t]) //use updater function and change the previous stateof the object not the current state.
                // getNotes();
                // console.log("1")
                 
            })
            .catch((err) => alert('popup form error',{err}));
    };

    const retreiveNote = (id) => {
        console.log("retrive note run ................")
        api
            .get(`/api/notes/retrieve/${id}/`)
            .then((res) => res.data)
            .then((data) => {
                setContent(data.content);
                setTitle(data.title);
            })
            .catch((err) => alert(err));
    };
    const updateNote = () => {
        console.log("update note  run ................")
        console.log(update_id)
        api
            .put(`/api/notes/update/${update_id}/`, { content, title })
            .then((res) => {
                if (res.status === 200) alert("Note updated!");
                else alert("Failed to update note.");
                props.toggle();
                // getNotes();
            })
            .catch((err) => alert(err));
    };

    

    const update_id = props.update_id;
    useEffect(() => {
        if (update_id) {
            retreiveNote(update_id);
        }
    }, [update_id]);
    return (
        <div className="popup">
            <div className="popup-inner">
                <i onClick={props.toggle}><FontAwesomeIcon icon={faXmark} style={{color: "black"}}/></i>
            {/* <button onClick={props.toggle}><i><FontAwesomeIcon icon={faXmark} /></i></button> */}
            <h2>Create a Note</h2>
            {/* <form onSubmit={createNote}> */}
            <form onSubmit={update_id ? updateNote : createNote}>
                <label htmlFor="title">Title:</label>
                {/* <br /> */}
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                {/* <br /> */}
                <textarea
                    id="content"
                    name="content"
                    rows={"5"}
                    cols={"50"}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
            {/* <button onClick={props.toggle}>Close</button> */}
            </div>
        </div>
    )
    return(
        <div className="popup">
        <div className="popup-inner">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button>
            </form>
            <button onClick={props.toggle}>Close</button>
        </div>
    </div>
)
    
}

export default PopupForm