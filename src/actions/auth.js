import Swal from 'sweetalert2'
import { type } from "../types/types";
import { firebase, googleAuthProvider } from "./../firebase/firebase-config"
import { cleaning } from './notes';
import { finishLoading, startLoading } from "./ui";

export const startLoginWithEmailPassword = (email, password) => {
    return async(dispatch) => {
        dispatch(startLoading());
        
        try {
            const res_firebase = await firebase.auth().signInWithEmailAndPassword(email, password);
            const { user } = await res_firebase;
            await dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
        } catch (error) {
            console.log(error)
            dispatch(finishLoading());
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        }
    }
};

export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName));
            }).catch(e => {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.message
                })
            })
    }
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            })
    }
};

export const login = (uid, displayName) => ({
    type: type.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
        
        dispatch( cleaning() );
    }
};

export const logout = () => {
    return {
        type: type.logout
    }
};