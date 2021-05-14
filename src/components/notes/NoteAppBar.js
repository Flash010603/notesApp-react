import React from 'react'
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadin } from '../../actions/notes';

export const NoteAppBar = () => {


    const dispatch = useDispatch();

    const { active} = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch(startSaveNote(active))
    };

    const handleUpload = () => {
         document.getElementById('fileSelect').click();
    };

    const handleFileChange = (e) => {
         const file = e.target.files[0];
        if(file){
            dispatch( startUploadin(file) );
        }
    };


    const fecha = moment(active.date).format('d-MM-YYYY') || '00-00-00';
    const hora = moment(active.date).format('HH:mm:ss') || '00:00';

    return (
        <div>
            <div className="note__nav">
                <div className="note__fecha" style={{display:'flex'}} >
                    <p> <i className="far fa-calendar-alt"></i> {fecha} </p> 
                    <p style={{marginLeft: 35}} >{hora}</p>
                </div>
                
                <input type="file" name="file" id="fileSelect" onChange={handleFileChange} style={{display: 'none'}} />

                <div className="note__buttons">
                    <button 
                        className="note__picture pointer"
                        onClick={handleUpload}
                    >Picture<i className="far fa-image"></i></button>
                    <button 
                        className="note__save pointer"
                        onClick={handleSave}
                    >Save <i className="far fa-save"></i></button>
                </div>
            </div>
        </div>
    )
}
