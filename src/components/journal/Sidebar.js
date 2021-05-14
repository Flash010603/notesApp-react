import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();

    const {name} = useSelector(state => state.auth);
    
    const handleAddEntry = () => {
        dispatch(startNewNote());
    };

    const handleLogout = () => {
        dispatch(startLogout());
        
    };
    

    return (
        <div className="journal__sidebar">
            
            <div className="journal__header">
                <div className="journal__user center">
                    <h3 className="animate__animated animate__bounce">{name} <i className="far fa-moon"></i></h3>
                </div>
                <div className="journal__button">
                    <button className="btn pointer" onClick={handleLogout}>Logout <i className="fas fa-sign-out-alt"></i></button>
                </div>
            </div>
            <div 
                className="journal__btnCrear center"
                onClick={handleAddEntry}
            >
                <span>
                    <i className="far fa-calendar-plus pointer"></i>
                    <p>New entry</p>
                </span>
            </div>

            <JournalEntries/>

        </div>
    )
}
