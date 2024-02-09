import  { useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.scss';
import Button from '../UI/Button/Button';
import ErrorPage from '../../pages/Error';
import { Link } from 'react-router-dom';
 

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }

  return { value: '', isValid: false };
};

const Login = (props) => {
   
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  // useEffect(() => {
  // //  console.log('EFFECT RUNNING');

  //   return () => {
  //  //   console.log('EFFECT CLEANUP');
  //   };
  // }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    props.cleanErrorMessage();
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    props.cleanErrorMessage();
    setEnteredPassword(event.target.value);

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    props.cleanErrorMessage();
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    props.cleanErrorMessage();
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    props.cleanErrorMessage();
    event.preventDefault();
    
    props.onLogin(emailState.value,enteredPassword)
   // props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
        <form  >
     
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
             
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
             {props.errorMessage && <ErrorPage errorMessage={props.errorMessage} title={""}/>}

          
          <Button type='button' onClick={submitHandler} className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
          <br />

          <Link to="/newuser"> 
          <button type='button' className={classes.btnFlat}>Registrar</button>
          </Link>
        </div>
       
      </form>
    </Card>
  );
};

export default Login;
