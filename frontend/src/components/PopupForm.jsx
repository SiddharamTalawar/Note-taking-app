import React,{useState} from "react";
import api from "../api";
// import { getNotes } from "../pages/Home";
import "../styles/PopupForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
function PopupForm(props) {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                props.toggle();
                console.log("1")
                getNotes();
                console.log("1")
            })
            .catch((err) => alert(err));
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <i onClick={props.toggle}><FontAwesomeIcon icon={faXmark} style={{color: "black"}}/></i>
            {/* <button onClick={props.toggle}><i><FontAwesomeIcon icon={faXmark} /></i></button> */}
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
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