import React from 'react'
import "./Login.css"
import { Button } from '@mui/material'
import logo from './PrivText.png';
import { auth, provider } from './Firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';


function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert(error.message));
    };

  return (
    <div className='login'>
        <div className="login_container">
            <img src={logo} alt="img" />
            <div className="login_text">
                <h1>LOGIN</h1>
            </div>

            <Button onClick={signIn}>
                Sign In With Google
            </Button>
        </div>
    </div>
  )
}

export default Login