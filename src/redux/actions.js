 
import { 
  IS_LOADING,
  FAIL_TRY_LOGIN,
  SUCCESS_LOGIN,
  LOGOUT,
  RECONECT_LOGIN, 
  CREATE_NEW_USER,
  FAIL_SERVER
   
  } from "./actions-types";
 
 
import axios from 'axios';

//const URL = 'https://pi-driver-backend-production.up.railway.app/drivers';
//const URL_TEAMS = 'https://pi-driver-backend-production.up.railway.app/teams/';
 
axios.defaults.baseURL=process.env.VITE_BASE_URL;

//console.log('actions:',axios.defaults.baseURL);
 

export const setIsLoading=(trueOrFalse)=>({
 
type: IS_LOADING,
payload: trueOrFalse,
});

export const actionReconectLogin = (userLogged)=>({
  type: RECONECT_LOGIN,
  payload:userLogged,
});

export const actionLogout =  ()=>({
 // dispatch(setIsLoading(true))

    type:LOGOUT
 

  //dispatch(setIsLoading(false))
})
export const actionTryLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));

      const response = await axios.get(`/login?email=${email}&password=${password}`);
      const data = response.data;

      if (data.email === email && data.isLogin) {
        dispatch(setIsLoading(false));
        const errorMessage = ['Successful login'];

        dispatch({
          type: SUCCESS_LOGIN,
          payload: {
            data,
            isLogin: true,
            errorMessage,
          },
        });
      } else {
        dispatch(setIsLoading(false));
        const errorMessage = ['Invalid user or password, please try again!'];
        dispatch({
          type: FAIL_TRY_LOGIN,
          payload: errorMessage,
        });
      }
    } catch (error) {
      dispatch(setIsLoading(false));

      if (error.response) {
        const errorMessage = [error.response.data];
        dispatch({
          type: FAIL_TRY_LOGIN,
          payload: errorMessage,
        });
        console.error('Error response data:', error.response.data);
      } else {
        const errorMessage = ['An error occurred. Please try again later.'];
        dispatch({
          type: FAIL_TRY_LOGIN,
          payload: errorMessage,
        });
        console.error('Network error:', error.message);
      }

      // Devolver una promesa rechazada para permitir el manejo de errores en el bloque catch externo
      return Promise.reject(error);
    }
  };
};

export const actionFailServer = () =>({
  type:FAIL_SERVER,
  
})


// export const setCurrentPage = (currentPage) => ({
//   type: SET_CURRENT_PAGE,
//   payload: currentPage,
// });

// export const setTotalPages = (driversPerPage) => (dispatch, getState) => {
//   const state = getState();
//   const totalPages = Math.ceil(state.drivers.length / driversPerPage);

//   dispatch({
//     type: SET_TOTAL_PAGES,
//     payload: totalPages,
//   });
// };

// export const actionLoadAllTeams = () => {
//   return async (dispatch) => {
    
//     try {
      
//       let data = null;
//       const response = await axios.get('/teams');
//       data = response.data;

       

//       dispatch({
//         type: ALL_TEAMS,
//         payload: data,
//       });
       
//     } catch (error) {
//       dispatch(setIsLoading(false))
//       if (error.response) {

//         // El servidor respondió con un estado diferente de 2xx
//         console.error('Error response data:', error.response.data);
//         console.error('Error response status:', error.response.status);
//         console.error('Error response headers:', error.response.headers);
//       } else if (error.request) {
//         // La solicitud se hizo pero no se recibió respuesta
//         console.error('Error request:', error.request);
//       } else {
//         // Otro tipo de error
//         console.error('Error message:', error.message);
//       }

//       // Lanza la excepción para que los componentes que llaman a esta acción puedan manejar el error
//       throw error;
//     }
//   };
// };
// export const loadAllDrivers = (searchInput) =>{
//   return async (dispatch) => {
//     try {

//        // Indicar que se está cargando
//        dispatch(setIsLoading(true))
       
//       // Lógica para obtener los drivers
      
       
//       //const response = await axios(`{'/drivers/'}${searchInput}`);  
//       const response = await axios(`drivers/${searchInput}`);   
//       const data = response.data;

      
//       const drivers = data;
//       const message = drivers.length >0 ? 'Success' : data.message;
    
     
       
//       dispatch({
//         type: drivers.length > 0 ? ALL_DRIVERS: GET_ERROR_SEARCH,
//         payload: {
//           drivers,
//           message:message
           
//         },
//       });


//       // Reiniciar los filtros de team y origin
//       //dispatch(filterByTeam(""));
//      // dispatch(filterByOrigin("All"));
//      dispatch(actionLoadAllTeams());
//      dispatch(setIsLoading(false));
      
//     } catch (error) {
//       // Manejo de errores si es necesario
//       dispatch(setIsLoading(false))
//       if (error.response) {
//         // El servidor respondió con un estado diferente de 2xx
//         console.error('Error response data:', error.response.data);
//         console.error('Error response status:', error.response.status);
//         console.error('Error response headers:', error.response.headers);
//       } else if (error.request) {
//         // La solicitud se hizo pero no se recibió respuesta
//         console.error('Error request:', error.request);
//       } else {
//         // Otro tipo de error
//         console.error('Error message:', error.message);
//       }

//       dispatch({
//         type: GET_ERROR_SEARCH,
//         payload: {
//           message: error.response.data,
//         },
//       });
//     }
//   };
// }

// export const actionGetDriverById = (searchInput)=>{
//   console.log('searchInput valor:',searchInput);
//   return async (dispatch) => {
//     try {
//       dispatch(setIsLoading(true))
//       // Lógica para obtener los drivers
      

//       const response = await axios(`drivers/${searchInput}`);      
//       const data = response.data;
     
//       const drivers = data;
//       const message = data.forename? 'Success' : response.data;
//       //const message = data.message !== undefined ? data.message : 'No message available';
    
       
//       dispatch({
//         type: GET_DRIVER_BY_ID,
//         payload: {
//           drivers,
//           message: message,
//         },
//       });

//       dispatch(setIsLoading(false))
//     } catch (error) {
//       dispatch(setIsLoading(false))
//       if (error.response) {
//         // El servidor respondió con un estado diferente de 2xx
//         console.error('Error response data:', error.response.data);
//         console.error('Error response status:', error.response.status);
//         console.error('Error response headers:', error.response.headers);
//       } else if (error.request) {
//         // La solicitud se hizo pero no se recibió respuesta
//         console.error('Error request:', error.request);
//       } else {
//         // Otro tipo de error
//         console.error('Error message:', error.message);
//       }

//       dispatch({
//         type: GET_ERROR_SEARCH,
//         payload: {
//           message: error.response.data,
//         },
//       });
//     }
//   };

// }

// export const actionGetDriverDetailById = (searchInput)=>{
   
//   return async (dispatch) => {
//     try {
//       // Lógica para obtener los drivers
     
//       dispatch(setIsLoading(true))

//       const response = await axios(`drivers/'}${searchInput}`);      
//       const data = response.data;
      
//       //const drivers = Array.isArray(data) ? data : [data];
//       const drivers = data;
       
//       const message = drivers.length >0 ? 'Success' : 'No driver found.';
       
//       dispatch({
//         type: GET_DRIVER_DETAIL_BY_ID,
//         payload: {
//           drivers,
//           message: message,
//         },
//       });

//       dispatch(setIsLoading(false))
//     } catch (error) {
//       // Manejo de errores si es necesario
//       console.error(error);
//     }
//   };

// }

export const actionCreateNewUser = (formData)=>{
  
  let statusData='';
   
  let responseFormData={};
  let message;
  
  return async (dispatch) => {
    try { 

      dispatch(setIsLoading(true))
    const response = await axios.post('/user/', formData,  
      {
        headers: {
          'Content-Type': 'application/json', // Puedes agregar otros encabezados si es necesario
        },
       
      });

      
      if (response.status === 201) {
        // Éxito
         statusData='Saved';
         
      

        
       // setFormData({ ...initialFormData, buttonDisabled:true, status:'Saved' })
       responseFormData=response.data;
        message = 'Saved Successfully' 
        // Puedes agregar más lógica aquí después de la creación exitosa del driver
      } else {
        // Si el servidor responde con un código de error
         statusData=response.status;
         
         message=response.data;
        console.error('Error the response of the API:', response.status, response.data);

      }
       
      dispatch({
        type: CREATE_NEW_USER,
        payload: {
          formData:responseFormData,
          status:statusData,
          message: message,
        },
      });

      dispatch(setIsLoading(false))
    } catch (error) {
      // Manejo de errores si es necesario
      let errorMessage='';
      console.error(error);
      dispatch(setIsLoading(false));

      if(error.response.status===404){
         errorMessage = [error.response.status,':',error.response.statusText];
      
        console.error('Error response data 404:', error.response.data);

      } else {

        
        if (error.response) {
           errorMessage = [error.response.statusText,': ',error.response.data];
         
          console.error('Error response data:', error.response.data);
        } else {
           errorMessage = ['An error occurred. Please try again later.'];
          
          console.error('Network error:', error.message);
        }
        
      }
      
      dispatch({
        type: FAIL_SERVER,
        payload: errorMessage,
      });
      // Devolver una promesa rechazada para permitir el manejo de errores en el bloque catch externo
      return Promise.reject(error);
    }
  };

}

// export const filterByTeam = (team)=>{
 
//   return {
//     type: FILTER_BY_TEAM,
//     payload: team
//   }

 
// }

// export const filterByOrigin = (origin)=>{
//   return {
//     type: FILTER_BY_ORIGIN,
//     payload: origin
//   }
// }

// export const resetFilters = () => {
  
//   return {
//     type: RESET_FILTERS,
    
    
//   };
 
// };


// export const actionSortBy = (sortbyTypeName)=>({
//     type:sortbyTypeName,
//     payload:sortbyTypeName
// });
 