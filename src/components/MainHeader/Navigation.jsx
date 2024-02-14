import { Link   } from 'react-router-dom';
 

import classes from './Navigation.module.scss';

const Navigation = (props) => {
 

 const {user_name, user_lastname} =  props.userLogged? props.userLogged :{};
  //const token = useRouteLoaderData('root');
  
  
  // useEffect(() => {
  //   console.log('User logged changed:', userLogged);
  //   // Tu lógica adicional aquí...
  // }, [userLogged]);
  

 
  return (
    <>
      {props.isLoggedIn && (
         
              <Link  to="/" className={props.Linknav}> 
              <span className={props.itemnav}>Home </span>  
              </Link>
             
            
      
        )}
        {props.isLoggedIn && (
          <Link to={'/'} className={props.Linknav}>
            <span className={props.itemnav}>Users</span>
          </Link>
        )}
        {props.isLoggedIn && (
          <Link>
            <span  className={props.itemnav}>{user_name +' ' + user_lastname}</span>
          </Link>
        )}
        
    
        {props.isLoggedIn && (
          
          
          
          <Link className={classes.Linknav}>   
            <button className={classes.button} onClick={props.onLogout}>
              Logout
            
            </button> 
             

            
          </Link>
        )}
      
      </>
      );
    };
    
    export default Navigation;
    