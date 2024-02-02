import { NavLink   } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';

import classes from './Navigation.module.scss';

const Navigation = (props) => {
 

 const {user_name, user_lastname} =  props.userLogged? props.userLogged :{};
  //const token = useRouteLoaderData('root');
  
  
  // useEffect(() => {
  //   console.log('User logged changed:', userLogged);
  //   // Tu lógica adicional aquí...
  // }, [userLogged]);
  

 
  return (
    <nav className={classes.nav}>
      <ul>
      {props.isLoggedIn && (
          <li>
              <NavLink to="/"> 
                Home
              </NavLink>
             
            
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a >{user_name +' ' + user_lastname}</a>
          </li>
        )}
        
    
        {props.isLoggedIn && (
         

          
          <li className={classes.btnContainer}>   
            <button onClick={props.onLogout}>
              Logout
            
            </button> 
             

            
          </li>
        )}
      </ul>
      
    </nav>
  );
};

export default Navigation;
