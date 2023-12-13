import logo from "../assets/logoblanco.png";

import Navigation from './Navigation';
import classes from './MainHeader.module.scss';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1> <img className={classes.logo} src={logo} alt="HR Logo" />
   </h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;
