import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux'

import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { login } from '../actions/auth'
import { NotFound } from '../components/404/NotFound'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import {startLoadingNotes } from '../actions/notes'


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [check, setCheck] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        firebase.auth().onAuthStateChanged(async(user) => {
            
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));

            } else {
                setLoggedIn(false)
            }
            setTimeout(() => {
                setCheck(false);
            }, 1500);
        });


    }, [dispatch, setCheck , setLoggedIn]);


    if (check) {
        return (
            <NotFound page={false} />
        )
    }
    
    
    return (

        <Router>
            <div>
                <Switch>
                    

                    <PublicRoute path="/auth" isAuthenticated={loggedIn} component={AuthRouter} />

                    <PrivateRoute exact isAuthenticated={loggedIn} path="/" component={JournalScreen} />


                    {/* <Route path="*"  component={NotFound}/>   */}

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>

    )
}
