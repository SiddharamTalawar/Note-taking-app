import React from "react";
import { useState,useContext} from "react";
import PopupForm from "../components/PopupForm"
import "../styles/PopupForm.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus} from '@fortawesome/free-solid-svg-icons'

function CreateNoteButton(props) {
    const [seen, setSeen] = useState(false)
    
    function togglePop () {
        setSeen(!seen);
    };

    return (
        <div>
            <button onClick={togglePop}><i><FontAwesomeIcon icon={faPlus} /></i></button>
                
                
            {seen ? <PopupForm toggle={togglePop} update_id ={props.update_id}  /> : null}
        </div>
    )
}

export default CreateNoteButton