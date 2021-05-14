import Swal from 'sweetalert2'

import { db } from "../firebase/firebase-config"
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { type } from "../types/types";

export const startNewNote = () => {
    return async( dispatch, getState )=>{
        
        const {uid} = getState().auth
        
        const newNote={
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc =  await db.collection(`${ uid }/journal/notes`).add( newNote );
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));
    }
}


export const activeNote = (id, note) => ({
     type: type.notesActive,
     payload:{
         id,
         ...note
     }
});

export const addNewNote = (id, note) => ({
    type: type.notesAddNew,
    payload:{
        id,
        ...note
    }
});

export const startLoadingNotes = (uid) => {
     return async(dispatch)=>{
        const notas = await loadNotes(uid);
        dispatch(setNotes(notas))
     }
};

export const setNotes = (notes) => ({
    type: type.notesLoad,
    payload:notes
           
});

export const startSaveNote = (nota) => {

    return async( dispatch, getState )=>{
        
        const {uid} = getState().auth

        if(!nota.url){
            delete nota.url; 
        }

        const noteToFireStore = {...nota};
        delete noteToFireStore.id;

        await db.doc(`${uid}/journal/notes/${nota.id}`).update(noteToFireStore);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Actualización completada',
            text: 'Tu nota ha sido actualizada correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          
        dispatch(refresNote(nota.id, noteToFireStore))
    }   
};


export const refresNote = (id,note) => ({
    type: type.notesUpdate,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }    
});

export const startUploadin = (file) => {
     return async(dispatch, getState )=>{

        const { active:activeNote } = getState().notes

        Swal.fire({
            title: 'La imagen se esta subiendo',
            text: 'cargando imagen en el servidor...',
            showConfirmButton: false,
            showCancelButton: false,
            allowOutsideClick: false,
            willOpen: ()=>{
                Swal.showLoading();
            }
          })

        const fileUrl = await fileUpload(file);
        
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );

        Swal.close();
     }
};

export const startDeleting = (id) => {
     return async(dispatch, getState )=>{
        
        const {uid} = getState().auth

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Eliminación completada',
            text: 'Tu nota ha sido eliminada correctamente',
            showConfirmButton: false,
            timer: 1500
          })

     }
};

export const deleteNote = (id) => ({
    type: type.notesDelete,
    payload:id
});

export const cleaning = () => ({
    type: type.notesLogoutCleaning
});
