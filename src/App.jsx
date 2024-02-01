import { useState, useEffect } from 'react'
//import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
 import Login from './components/Login/Login';
 import HomePage from './components/Home/Home';
 import MainHeader from './components/MainHeader/MainHeader';
 import PageNotFound from './pages/PageNotFound';
 import Loader from './pages/Loader/Loader';

import { useDispatch, useSelector } from 'react-redux';
import {actionLogout,actionReconectLogin} from './redux/actions';
 

 //import ErrorPage from './pages/Error';
 //import RootLayout from './pages/Root';
 import AuthenticationPage, {
  action as authAction,
} from './pages/Authentication';
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
  let storedUserLoggedInInformation = useSelector((state)=>state.userLogged);
  

  //    storedUserLoggedInInformation=useSelector((state)=>state.userLogged);
  // }

 // console.log('userLogged:',storedUserLoggedInInformation)
  const dispatch = useDispatch();
  //return <RouterProvider router={router}/>;

  const [isLoggedIn, setIsloggedIn] = useState(false);

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

    
  },[storedUserLoggedInInformation]);

  const loginHandler = (email, password) =>{
//console.log('loginHandler',email, password)
    //Here check the email and password
    if(email || password){  
      localStorage.setItem('isLoggedIn','1');
     // const userLogged_id = useSelector((state) => state.userLogged.id);
    //   console.log('user logged props login handler:',storedUserLoggedInInformation)
      // Almacena el valor en el localStorage
      localStorage.setItem('userLogged_email', email);
    //   localStorage.setItem('userLogged', storedUserLoggedInInformation.userLogged);
    //  // localStorage.setItem(useSelector((state)=>state.userLogged));


      setIsloggedIn(true); }
  
  }

  const logoutHandler = () =>{
    localStorage.removeItem('userLogged');
    localStorage.removeItem('isLoggedIn');
    dispatch(actionLogout())
    setIsloggedIn(false);
  }

  const { pathname } = useLocation();
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

  return (
    
    <div>
      <main>
      {isLoading && <Loader/>}
 
      <MainHeader isAuthenticated={isLoggedIn} userLogged={storedUserLoggedInInformation} onLogout={logoutHandler}/>
      {!isLoggedIn && <Login onLogin={loginHandler}  />}

      
   
      {isLoggedIn && <HomePage userLogged={storedUserLoggedInInformation}/>}

      </main>
    </div>
  )
 }

export default App
