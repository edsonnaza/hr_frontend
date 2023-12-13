import { useState, useEffect } from 'react'

 import Login from './Login/Login';
 import Home from './Home/Home';
 import MainHeader from './MainHeader/MainHeader';
import './App.scss'

function App() {
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


  return (
    
    <div>
      <h1>Human Resources</h1>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>
      <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
   
      </main>
    </div>
  )
}

export default App
