import { useState, useEffect } from 'react'
//import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
 import Login from './components/Login/Login';
 import HomePage from './components/Home/Home';
 import MainHeader from './components/MainHeader/MainHeader';
 import PageNotFound from './pages/PageNotFound';
 import Loader from './pages/Loader/Loader';

import { useDispatch, useSelector } from 'react-redux';
 

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
  console.log('isLoading:', isLoading)
  const dispatch = useDispatch();
  //return <RouterProvider router={router}/>;

  const [isLoggedIn, setIsloggedIn] = useState(false);
   useEffect(()=>{
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
    if(storedUserLoggedInInformation ==='1'){
      setIsloggedIn(true);
    }
  },[]);

  const loginHandler = (email, password) =>{

    //Here check the email and password
    if(email || password){  
      localStorage.setItem('isLoggedIn','1');
      setIsloggedIn(true); }
  
  }

  const logoutHandler = () =>{
    localStorage.removeItem('isLoggedIn');
    setIsloggedIn(false);
  }

  const { pathname } = useLocation();

  return (
    
    <div>
      {isLoading && <Loader/>}
      <h1>Human Resources</h1>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>
      <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
        

        
   
      </main>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
 }

export default App
