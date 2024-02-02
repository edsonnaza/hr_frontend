import style from './PageNotFound.module.scss';
import { Link } from 'react-router-dom';
import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
const PageNotFound = ()=>{

    return (
        <Card className={style.container}>
            <p className="style.tigle">PAGE NOT FOUND</p>
            <p className={style.text}>Error 404</p>
            <hr />
            <Link to="/"> <Button className={style.btn}>Home</Button></Link>
        </Card>
    )
}

export default PageNotFound;