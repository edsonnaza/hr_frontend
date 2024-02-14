import logo from "../../assets/logoblanco.png";

import Navigation from './Navigation';
import classes from './MainHeader.module.scss';




const MainHeader = (props) => {

  return (
    // <header className={classes['main-header']}>
    //   <h1> <img className={classes.logo} src={logo} alt="HR Logo" /></h1>

    //   <Navigation isLoggedIn={props.isAuthenticated} userLogged={props.userLogged} onLogout={props.onLogout} />


    // </header>

    <header className={classes.navContainer}>
    {/* DIV FOR LOGO */}
    <div>
      <img className={classes.logo} src={logo} alt="CEC Logo" />
    </div>

    {/* DIV FOR SEARCH AND NAVIGATION */}

    <div className={classes.secondSection}>
      <div className={classes.wrapperItems}>
        {/* {props.logged && (
          <NavLink linknav={classes.linknav} itemnav={classes.itemnav} />
        )} */}
         <Navigation itemnav={classes.itemnav} Linknav={classes.linknav} isLoggedIn={props.isAuthenticated} userLogged={props.userLogged} onLogout={props.onLogout} />

      
      </div>

      <div className={classes.thirdSection}>
          <div className={classes.randomDiv}>
          {/* {props.logged && (<button onClick={randomHandler} className={classes.buttonRandom}>Random</button>)} */}
          </div>

          {/* <div className={classes.searchbarDiv}>

          {props.logged && (
            <SearchBar
              onSearch={props.onSearch}
              onSearchPrevImg={props.onSearchPrevImg}
            />
          )}
          {!props.responseData && (
            <div className={classes.response}>{props.errBarMessage}</div>
          )}
        </div> */}

        
      </div>
    </div>
  </header>


)

};

export default MainHeader;
