import { useState, useEffect } from 'react'
//import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
 import Login from './components/Login/Login';
 import HomePage from './components/Home/Home';
 import MainHeader from './components/MainHeader/MainHeader';
 import PageNotFound from './pages/PageNotFound/PageNotFound';
 import Loader from './pages/Loader/Loader';
 import NewUser from './components/NewUser/NewUser';
 

import { useDispatch, useSelector } from 'react-redux';
import {actionLogout,actionReconectLogin,actionTryLogin} from './redux/actions';
 
//import ErrorPage from './pages/Error';
//import RootLayout from './pages/Root';
// import AuthenticationPage, {
//   action as authAction,
// } from './pages/Authentication';
//import { action as logoutAction } from './pages/Logout';
//import {  tokenLoader } from './util/auth';

import './App.scss'
// const router = createBrowserRouter([
  //   { path: '/', element: <MainHeader  /> },
  
  //   {
    //     path: 'auth',
    //     element: <AuthenticationPage />,
    //     action: authAction,
    //   },
    
    // ]);
    function App() {
     
      const isLoading = useSelector((state) => state.isLoading);
      

      
 // console.log('isLoading:', isLoading)
 // console.log('isLogin:',useSelector((state)=>state.userLogged));
  const storedUserLoggedInInformation = useSelector((state)=>state.userLogged);
  

  //    storedUserLoggedInInformation=useSelector((state)=>state.userLogged);
  // }

 // console.log('userLogged:',storedUserLoggedInInformation)
  const dispatch = useDispatch();
  //return <RouterProvider router={router}/>;

  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const [errorMsg, setErrorMsg] = useState('');
   useEffect(()=>{
    //const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    //let storedUserLoggedInInformation = useSelector((state)=>state.userLogged);
    
    if(storedUserLoggedInInformation?.isLogin){
      setIsloggedIn(true);
      localStorage.setItem('userLogged', JSON.stringify(storedUserLoggedInInformation));
  
    } else {
    //  console.log('LocalStorage:',localStorage.getItem('userLogged'));
      dispatch(actionReconectLogin(JSON.parse(localStorage.getItem('userLogged'))))
    }

 
    
  },[storedUserLoggedInInformation, dispatch,isLoggedIn]);


 

  const tryLogin = async (email, password) => {
    setEmail(email);
    setPassword(password);
    try {
      console.log('email y password:', email, password);
      await dispatch(actionTryLogin(email, password));
      loginHandler(email,password)
    } catch (error) {
      setErrorMsg(error.response.data)
      console.log('Error during login:',error.response.data );
    }
  };


  useEffect(() => {
 

    //tryLogin(email, password);
  
  }, []); 
  
  
  //console.log('Error con Uselector:',useSelector((state) => state.userLogged.errorMessage))
  const loginHandler = (email, password) =>{
//console.log('loginHandler',email, password)
    //Here check the email and password
   // dispatch(actionTryLogin(emailState.value, enteredPassword));
    
    // console.log('errorMessage login handler:',storedUserLoggedInInformation)
   
    if(isLoggedIn){  

      
      localStorage.setItem('isLoggedIn','1');
     // const userLogged_id = useSelector((state) => state.userLogged.id);
    //   console.log('user logged props login handler:',storedUserLoggedInInformation)
      // Almacena el valor en el localStorage
      localStorage.setItem('userLogged_email', email);
    //   localStorage.setItem('userLogged', storedUserLoggedInInformation.userLogged);
    //  // localStorage.setItem(useSelector((state)=>state.userLogged));


      setIsloggedIn(true); 
    }  
  
  }

  const logoutHandler = () =>{
    localStorage.removeItem('userLogged');
    localStorage.removeItem('isLoggedIn');
    dispatch(actionLogout())
    setIsloggedIn(false);
  }
  
  const cleanErrorMessage = ()=>{
    setErrorMsg('');
  }
  const { pathname } = useLocation();

  return (
    
    <div>
      <main>
        {isLoading && <Loader />}
        <MainHeader isAuthenticated={isLoggedIn} userLogged={storedUserLoggedInInformation} onLogout={logoutHandler} />
        <Routes>
          <Route path="/" element={isLoggedIn ? <HomePage userLogged={storedUserLoggedInInformation} /> : <Login cleanErrorMessage={cleanErrorMessage} onLogin={tryLogin} errorMessage={errorMsg} userLogged={storedUserLoggedInInformation} />} />
          <Route path="/login" element={!isLoggedIn ? <Login cleanErrorMessage={cleanErrorMessage} onLogin={tryLogin} errorMessage={errorMsg} userLogged={storedUserLoggedInInformation} /> :<HomePage userLogged={storedUserLoggedInInformation} /> } />
          <Route path='/newuser' element={<NewUser/> } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  )
 }

export default App
