import React from "react";
import { useState } from "react";
import PopupForm from "../components/PopupForm"
import "../styles/PopupForm.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus} from '@fortawesome/free-solid-svg-icons'
function CreateNoteButton() {
    const [seen, setSeen] = useState(false)

    function togglePop () {
        setSeen(!seen);
    };

    return (
        <div>
            <button onClick={togglePop}><i><FontAwesomeIcon icon={faPlus} /></i></button>
                
                
            {seen ? <PopupForm toggle={togglePop} /> : null}
        </div>
    )
}

export default CreateNoteButton