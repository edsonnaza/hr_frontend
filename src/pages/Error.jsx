import { useRouteError } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PageContent from '../components/PageContent/PageContent';
import { useEffect } from 'react';

function ErrorPage(props) {

  
  const message = useSelector((state)=>state.userLogged)
  console.log('ErrorPage:',message);
   
  // const error = useRouteError();

  // let title = 'An error occurred!';
  // let message = 'Something went wrong!';p


  // if (error.status === 500) {
  //   message = error.data.message;
  // }

  // if (error.status === 404) {
  //   title = 'Not found!';
  //   message = 'Could not find resource or page.';
  // }

  return (
    <>
      <PageContent title={props.title}>
        <p>{props.errorMessage}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
