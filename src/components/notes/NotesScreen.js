import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar'

export const NotesScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);
    
    const [formValue, handleInputChange, reset] = useForm(note);

    const {title,body, id} = formValue;

    const activeID= useRef(note.id);

    useEffect(() => {
        if(note.id !== activeID.current){
            reset(note)
            activeID.current = note.id 
        }
    }, [note, reset]);

    useEffect(() => {
        
        dispatch(activeNote(formValue.id, {...formValue}))

    }, [formValue, dispatch])

    const handleDelete = () => {
         dispatch(startDeleting(id))
    };

    return (
        <div className="note__container">
            <NoteAppBar/>

            <div className="note__main">
                <input 
                    type="text" 
                    name="title"  
                    placeholder="What's the title?"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea 
                    name="body"  
                    placeholder="What's happend?"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                   {
                       (note.url)&&
                        <div className="note__image animate__animated animate__zoomIn">
                            <img 
                            src={note.url} 
                            alt=""
                        />
                        </div>
                   }
            </div>

            <div 
                className="note__footer"
                onClick={handleDelete}
            >
                <p>Delete</p>
            </div>
        </div>
    )
}
