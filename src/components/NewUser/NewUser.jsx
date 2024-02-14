  import { useEffect, useReducer, useState } from 'react';
  import style from './NewUser.module.scss';
  import Card from '../UI/Card/Card';
  import Button from '../UI/Button/Button'
  import validateForm from '../../util/validateNewUser';
  import { useDispatch, useSelector } from 'react-redux';
  import { actionCreateNewUser } from '../../redux/actions';
  import { Link, useNavigate } from 'react-router-dom';

   

 

  const NewUser = () =>{

    const message = useSelector((state)=>state.message);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
      
      const initErroMessage={
          enteredEmail:'',
          enteredPassword:'',
          enteredRetypePassword:'',
          enteredUserName:'',
          enteredLastName:'',
      
        }
        const initialFormStatus = {
           
            status,
            saveButtonLocal:true,
            formIsValid:false
             
          };

        const initInputForm={
            email:'',
            password:'',
            retypePassword:'',
            user_name:'',
            user_lastname:'',
        
          }

    const [inputForm, setInputForm] = useState(initInputForm)   ; 
   // const [formIsValid, setFormIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(initErroMessage)
    const [formStatus, setFormStatus] = useState(initialFormStatus);
    const [counter, setCounter] = useState(0);
  
    
    
 

  const handleInputChange = (e) => {
    e.preventDefault();
  
    // Obtén el nombre y el valor del elemento que cambió
    const { name, type } = e.target;
    let value;
  
    // Si es una selección múltiple, determina las opciones seleccionadas
    if (type === 'select-multiple') {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      const isOptionSelected = inputForm[name].includes(selectedOptions[0]);
  
      // Si la opción seleccionada ya estaba presente, quítala; de lo contrario, acumúlala
      value = isOptionSelected
        ? inputForm[name].filter(option => !selectedOptions.includes(option))
        : [...inputForm[name], ...selectedOptions];
    } else {
      value = e.target.value;
    }
  
    // Actualiza el estado común para ambos casos (input y selección)
    setInputForm((prevInputForm) => ({
      ...prevInputForm,
      [name]: value,
    }));
  
    // Validar el formulario y establecer el mensaje de error
    setErrorMessage((prevErrorMessage) => {
      const updatedErrorMessage = validateForm({ ...inputForm, [name]: value });
      
      // Verifica si no hay errores para activar el botón de guardar
      if (Object.values(updatedErrorMessage).length === 0) {
        console.log('antes de actualizar formStatus isValid:', formStatus.formIsValid);
        setFormStatus((prevFormStatus) => ({ ...prevFormStatus, formIsValid: true }));
      } else {
        setFormStatus((prevFormStatus) => ({ ...prevFormStatus, formIsValid: false }));
      }
  
      return updatedErrorMessage;
    });
  };
 

  const submitHandler = async (event) => {
    event.preventDefault();

    if (formStatus.formIsValid) {
        console.log('Will send the data to save...', inputForm);
        try {
            console.log('sending...');
            await dispatch(actionCreateNewUser(inputForm));

            // Función que espera 5 segundos antes de redirigir a la página de inicio de sesión
            const waitAndRedirect = () => {
                let counter = 1;
                const intervalId = setInterval(() => {
                    console.log('leaving...', counter);
                    counter++;
                    setCounter(counter);
                }, 1000);

                return new Promise((resolve) => {
                    const timeoutId = setTimeout(() => {
                        clearInterval(intervalId); // Limpiar el intervalo
                        resolve();
                    }, 5000);

                    // Devolver el ID del temporizador para limpiarlo más tarde si es necesario
                    return timeoutId;
                });
            };

            const timeoutId = waitAndRedirect(); // Esperar 5 segundos
            await timeoutId; // Esperar a que se resuelva la promesa (no hace nada, solo para sincronización)
            setInputForm(initInputForm);
            navigate('/login'); // Redirigir a la página de inicio de sesión después de 5 segundos
            
        } catch (error) {
            console.log('Error during login:', error.response ? error.response.data : error);
        }
    }
};


 
   

    return (
        <Card className={style.form}>
        <form  >
            <h1>New User</h1>
        <div
          className={`${style.control} ${
            errorMessage.enteredEmail?.length > 0 ? style.invalid : ''
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type='email'
            name='email'
            value={inputForm.email}
            onChange={handleInputChange}
             
          />
              <span className={style.spanMessage} data-testid="enteredEmailMessage">{errorMessage && errorMessage.enteredEmail}</span>
        </div>

        <div
          className={`${style.control} ${
            errorMessage.enteredPassword?.length > 0 ? style.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type='password'
            name='password'
            value={inputForm.password}
            onChange={handleInputChange}
          /> 

       <span className={style.spanMessage} data-testid="enteredPasswordMessage">{errorMessage && errorMessage.enteredPassword}</span>
        </div>

        <div
          className={`${style.control} ${
            errorMessage.enteredRetypePassword?.length > 0 ? style.invalid : ''
          }`}
        >
          <label htmlFor="retypepassword">ReType-Password</label>
          <input
            type='password'
            name='retypePassword'
            value={inputForm.retypePassword}
            onChange={handleInputChange}
          />   

          <span className={style.spanMessage} data-testid="enteredRetypePasswordMessage">{errorMessage && errorMessage.enteredRetypePassword}</span>
   
           </div>


        <div
          className={`${style.control} ${
            errorMessage.enteredUserName?.length > 0 ? style.invalid : ''
          }`}
        >
          <label htmlFor="user_name">User Name</label>
          <input
            type='text'
            name='user_name'
            value={inputForm.user_name}
            onChange={handleInputChange}
          />  
          <span className={style.spanMessage} data-testid="enteredUserNameMessage">{errorMessage && errorMessage.enteredUserName}</span>
        </div>

        <div
          className={`${style.control} ${
            errorMessage.enteredLastName?.length > 0 ? style.invalid : ''
          }`}
        >
          <label htmlFor="user_lastname">User Lastname</label>
          <input
            type='text'
            name='user_lastname'
            value={inputForm.user_lastname}
            onChange={handleInputChange}
          />   

          <span className={style.spanMessage} data-testid="enteredLastnameMessage">{errorMessage && errorMessage.enteredLastName}</span>   
          </div>

          
          <p className={style.savedMessage}>{message && message}</p>
   
        <div className={style.actions}>
          <div className={style.btnContainer}>

          <Button onClick={submitHandler} className={style.btn} 
          disabled={!formStatus.formIsValid}>{counter>=1 ?'Leaving in: '+counter :'Save'}
          </Button>
          </div>

          <div className={style.btnContainer}>
          <Link to={'/login'}>
           <Button  className={style.btn}>Cancel</Button>
          </Link>
          </div>
        </div>
            </form>

          
 
        </Card>
    )
}

export default NewUser;