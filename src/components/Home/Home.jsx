//import PageContent from '../PageContent/PageContent'

import Card from '../UI/Card/Card';
import classes from './Home.module.scss';
import { useSelector } from 'react-redux';

const Home = (props) => {
  const {user_name,user_lastname} = props.userLogged?props.userLogged:{};
  return (
    
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <h3>{user_name +' ' + user_lastname}</h3>

    </Card>
  );
};

export default Home;