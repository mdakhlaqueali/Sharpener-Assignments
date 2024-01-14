import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../store/authReducer';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    dispatch(authActions.toggle());
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;

    // if (!isLogin && enteredPassword !== confirmPassword) {
    //   setIsLoading(false);
    //   alert("Passwords do not match!");
    //   return;
    // }

    setIsLoading(true);

    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBiEoVyC6pTrqMH33q1rNiN1-Ck8F40X8M';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBiEoVyC6pTrqMH33q1rNiN1-Ck8F40X8M';
    }
    
    if (enteredPassword === confirmPassword) {
    axios
      .post(url, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      })
      .then((response) => {
        setIsLoading(false);
        const token = response.data.idToken;
        if(token){
          dispatch(authActions.login(token));
          localStorage.setItem("token", token);
          console.log('login/signup success');
          navigate('/');
        }else{
          console.log("Invalid token", token);
        }
        
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error.response.data.error.message);
      });
    }else{
      setIsLoading(false);
      alert("Password and Confirm Password doesn't match")
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
          <label htmlFor='password'>Confirm Password</label>
          <input 
            type="password"
            required  
            ref={confirmPasswordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          <Link to='/forgot-password'><button>Forgot Password</button></Link>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
