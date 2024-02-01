import { NavLink   } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';

import classes from './Navigation.module.scss';

const Navigation = (props) => {
  console.log(props.userLogged);

 const {user_name, user_lastname} =  props.userLogged? props.userLogged :{};
  //const token = useRouteLoaderData('root');
  
  
  // useEffect(() => {
  //   console.log('User logged changed:', userLogged);
  //   // Tu lógica adicional aquí...
  // }, [userLogged]);
  

  console.log('Navigation',props.userLogged)
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
         

          
          <li>   
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
