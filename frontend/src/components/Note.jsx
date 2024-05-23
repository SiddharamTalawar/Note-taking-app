import React, {useContext}from "react";
import "../styles/Note.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan ,faPenToSquare} from '@fortawesome/free-regular-svg-icons'
import CreateNoteButton from "../components/CreateNoteButton"
import PopupForm from "../components/PopupForm"





function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-IN")
    const newDate = new Date().toLocaleDateString("en-IN")
    // console.log(formattedDate,newDate)
    let date = (formattedDate == "Invalid Date") ? newDate : formattedDate
//    console.log(date)
    const [seen, setSeen] = React.useState(false)
    
    
    function togglePop () {
        setSeen(!seen);
    };
    const [visible, setVisible] = React.useState(false);
    function update(e) {
        // e.preventDefault();
        if(!note.id)
            {
                alert("somthing went wrong! please refresh the the page and try again.");
            }
            else{
                setVisible(true);
        console.log("update id called")
            }
        
      }
    return (
        <div className="note-container">
            <div className="note-header"> 
            <p className="note-title">{note.title}</p>
            <div className="icon-container">
                
                <i className="edit-button">
                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => update()}/>
                </i>
                
                <i className="delete-button">
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => onDelete(note.id)} />
                </i>
            
            
            </div>
            
            </div>
           
            <p className="note-content">{note.content}</p>
            <p className="note-date">{date }</p>
            {visible && (<PopupForm toggle={togglePop} update_id ={note.id}  />)}
            {/* <p className="note-date">{newDate}</p> */}
            {/* <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button> */}
        </div>
    );
}

export default Note