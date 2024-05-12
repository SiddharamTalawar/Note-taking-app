import React from "react";
import "../styles/Note.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan ,faPenToSquare} from '@fortawesome/free-regular-svg-icons'

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-IN")

    return (
        <div className="note-container">
            <div className="note-header"> 
            <p className="note-title">{note.title}</p>
            <div className="icon-container">
                <i className="edit-button">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </i>
                <i className="delete-button">
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => onDelete(note.id)} />
                </i>
            
            
            </div>
            
            </div>
           
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            {/* <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button> */}
        </div>
    );
}

export default Note