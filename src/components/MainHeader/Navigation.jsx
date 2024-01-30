import { NavLink   } from 'react-router-dom';

import classes from './Navigation.module.scss';

const Navigation = (props) => {
  //const token = useRouteLoaderData('root');
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
            <a href="/">Admin</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
