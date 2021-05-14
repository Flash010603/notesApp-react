import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startRegisterWithEmailPassword } from '../../actions/auth';

import { removeError, setError } from '../../actions/ui';

import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msg} = useSelector(state => state.ui);

    const [formValue, handleInputChange] = useForm({
        email: 'correo@correo.com',
        password: '123456',
        confirm_password:'123456',
        nameUser:'Perlar Rubi Madrigal Flores'
    });

    const {email, password, confirm_password, nameUser} = formValue;

    const handleRegister = (e)=>{
        e.preventDefault();
        if(isFormValid()){
           dispatch(startRegisterWithEmailPassword(email,password, nameUser))
        }
    }

    const isFormValid = () => {

        if(email.trim().length===0|| password.trim().length===0||confirm_password.trim().length===0 || nameUser.trim().length===0){
            dispatch(setError( 'Todos los campos son obligatorios'))
            return false;
        }else if(password.length<5){
            dispatch(setError( 'El password debe contenter minimo 6 caracteres'))
            return false;
        }
        else if(password!==confirm_password){
            dispatch(setError( 'Los password son diferentes'))
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setError( 'El email no es valido'))
            return false;
        }

        dispatch(removeError());
        return true;
    };

    return (
        <div>
        <p className="center auth__title mb-5" >Register</p>
        
        <div className="auth__container_form w-75 pack_flex p-3 rounded animate__animated animate__fadeIn">
           <form onSubmit={handleRegister}>
                <div className="inputs_jusn">
                    <div className="auth__item_form">
                        <label htmlFor="nameUser">Name:</label>
                    <input 
                            className="mt-1" 
                            type="text" 
                            name="nameUser" 
                            id="nameUser"
                            value={nameUser}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="auth__item_form">
                        <label htmlFor="email">Email:</label>
                    <input 
                            className="mt-1" 
                            type="email" 
                            name="email" 
                            id="user"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="inputs_jusn">
                    <div className="auth__item_form">
                        <label htmlFor="password">Password:</label>
                    <input 
                            className="mt-1" 
                            type="password" 
                            name="password" 
                            id="user"
                            value={password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="auth__item_form">
                        <label htmlFor="consfirm-password">Confirm Password:</label>
                    <input 
                            className="mt-1" 
                            type="password" 
                            name="confirm_password" 
                            id="pass"
                            value={confirm_password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                
                {
                    msg 
                        && 
                        <div className="auth__errors animate__animated animate__fadeIn">
                            <p><span>*</span>{msg}</p>
                        </div> 
                }
                <div className="auth__buttons">
                    <Link to="./login" className="pack_flex auth_btn_link">
                            Back
                    </Link>       
                    <button className="auth_btn  pointer">Create</button>
                </div>           
           </form>
        </div>
   </div>
    )
}
