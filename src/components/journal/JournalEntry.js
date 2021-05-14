import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, title, body, date,url}) => {

    const dispatch = useDispatch();

    const dia_letra = moment(date).format('dddd');
    const dia_numero = moment(date).format('D');


    const handleEntryClick = () => {
         
        dispatch(activeNote(id,{title, body, date,url}));
    
    };

    return (
        <div 
            className="journal__entry pointer animate__animated animate__backInLeft"
            onClick={handleEntryClick}
        >
            
            {
                (url)&&
                <div className="journal__img" style={{backgroundImage:`url(${url})`}}></div>
            }

            <div className="journal__body">
                <div className="journal__title">
                    <h4>{title}</h4>
                </div>
                <div className="journal__content">
                    <p>{body}</p>
                </div>
                <div className="journal__footer">
                    <p>{dia_letra} <b>{dia_numero}</b></p>
                </div>
            </div>


        </div>
    )
}
