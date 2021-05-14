import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginWithEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.ui);
    const { msg} = useSelector(state => state.ui);
    
    const [formValue, handleInputChange] = useForm({
        email:'correo@correo.com',
        password: '123456'
    });

    const {email, password} = formValue;

    const handleLogin = async(e) => {
         e.preventDefault();
        if(email.trim()=== '' && password.trim()===''){
            dispatch(setError( 'Todos los campos son obligatorios'))
        }else{
            dispatch(removeError());
            await dispatch(startLoginWithEmailPassword( email,password));
        }
    };

    const handleGoogleLogin = () => {
        dispatch(removeError());
        dispatch(startGoogleLogin());
    };

    return (
        <div>
             <p className="center auth__title mb-5" >Login</p>
             <div className="auth__container_form pack_flex p-3 rounded animate__animated animate__fadeIn">
                <form onSubmit={handleLogin}>
                     <div className="auth__item_form">
                         <label htmlFor="user">Email:</label>
                        <input 
                            className="mt-1" 
                            type="text" 
                            name="email"
                            autoComplete="off" 
                            id="user" 
                            value={email} 
                            onChange={handleInputChange}
                        />
                     </div>
                     <div className="auth__item_form">
                         <label htmlFor="pass">Password:</label>
                        <input 
                            className="mt-1" 
                            type="password" 
                            name="password"
                            autoComplete="off" 
                            id="pass" 
                            value={password} 
                            onChange={handleInputChange}
                        />
                     </div>
                     <div className="auth__item_form">
                         <p><Link className="pointer auth__link" to="./register">Crear cuenta</Link></p>
                     </div>
                     {
                        msg 
                            && 
                            <div className="auth__errors animate__animated animate__fadeIn">
                                <p><span>*</span>{msg}</p>
                            </div> 
                    }
                    <div className="auth__buttons btn_login">
                             
                        <button 
                            type="submit" 
                            className="auth_btn  pointer" 
                            disabled={loading}
                        >Log in - now</button>
                    </div>           
                </form>
                <div className="auth__buttons btn_login">    
                    <button  
                        className="auth__google pointer pack_flex"
                        onClick={handleGoogleLogin}
                    >
                        <img className="google-icon " src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        <span> Sig in with google</span>
                    </button>  
                </div>  
             </div>
        </div>
    )
}
