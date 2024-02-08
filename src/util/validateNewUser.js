

const validateForm =  (formData) => {
  
  let errorMessage={};
  
  var emailPattern = /\S+@\S+\.\S+/;
  if(!emailPattern.test(formData.email)){
  
  // if (!formData.enteredEmail.includes('@')) {
    console.log(formData.enteredEmail)
    errorMessage ={ ...errorMessage, enteredEmail:'Email invalid, please write a valid email!'}
  
  //   setFormData((prevData) => ({ ...prevData, descriptionMessage: 'Description is empty, please write a valid description!' }));
   return errorMessage;
  }
  
  if (!/^(?!\s*$).+/.test(formData.password)) {
    errorMessage={errorMessage,enteredPassword:"Password can not be empty, please write a valid password"};
    return errorMessage;
  }
  if (!/^.{6,15}$/.test(formData.password)) {
    errorMessage={errorMessage,enteredPassword:"Password must be between 6-15 characters."};
    return errorMessage;
  }
  if (!/\d/.test(formData.password)) {
    errorMessage={errorMessage,enteredPassword:"Must contain at least one number."};
  }
  if (!/[a-z]/.test(formData.password)) {
    errorMessage={errorMessage,enteredPassword:"Must contain a lowercase letter."};
    return errorMessage;
  }
  if (!/[A-Z]/.test(formData.password)) {
    errorMessage={errorMessage,enteredPassword:"Must contain an uppercase letter."};
    return errorMessage;
  }

  if(formData.retypePassword!==formData.password){
    console.log(formData.retypePassword, formData.password)
    errorMessage={errorMessage,enteredRetypePassword:"Both passwords must be equal, please try again."};
    return errorMessage;
  }
    if (/[^a-zA-Z\s]/.test(formData.user_name)) {
     // setFormData((prevData) => ({ ...prevData, forenameMessage: 'The name cannot contain symbols.' }));
     errorMessage={...errorMessage,enteredUserName:'The name cannot contain symbols.'}
     return errorMessage
    }
  
    if (/[^a-zA-Z\s]/.test(formData.user_lastname)) {
        
        errorMessage={...errorMessage,lastname:'The lastname cannot contain symbols.'}
      //setFormData((prevData) => ({ ...prevData, lastnameMessage: 'The lastname cannot contain symbols.' }));
       
      return errorMessage;
    }
  
    if (formData.user_name === '') {
      errorMessage ={ ...errorMessage, enteredUserName:'Name is empty, please write a valid name!'}
      // setFormData((prevData) => ({ ...prevData, forenameMessage: 'Name is empty, please write a valid name!' }));
      return errorMessage;
    }
    
    if (!/^.{3,50}$/.test(formData.user_name)) {
      errorMessage ={ ...errorMessage, enteredUserName:'Name must be at least 3 letters, please write a valid name!'}
      // setFormData((prevData) => ({ ...prevData, forenameMessage: 'Name is empty, please write a valid name!' }));
      return errorMessage;
    }
    
    if (formData.user_lastname === '') {
      errorMessage ={ ...errorMessage, enteredLastName:'Lastname is empty, please write a valid lastname!'}
    //   setFormData((prevData) => ({ ...prevData, lastnameMessage: 'Lastname is empty, please write a valid lastname!' }));
      return errorMessage;
    }

    if (!/^.{3,50}$/.test(formData.user_lastname)) {
      errorMessage ={ ...errorMessage, enteredLastName:'Lastname must be at least 3 letters, please write a valid name!'}
      // setFormData((prevData) => ({ ...prevData, forenameMessage: 'Name is empty, please write a valid name!' }));
      return errorMessage;
    }
  
    // if (formData.nationality === '') {
    //     errorMessage ={ ...errorMessage, nationality:'Nationality is empty, please write a valid nationality!'}

    // //   setFormData((prevData) => ({ ...prevData, nationalityMessage: 'Nationality is empty, please write a valid nationality!' }));
    //   return errorMessage;
    // }
  
    // if (formData.dob === '') {
    //     errorMessage ={ ...errorMessage, dob:'Date of birth is empty, please write a valid date!'}

    // //   setFormData((prevData) => ({ ...prevData, dobMessage: 'Date of birth is empty, please select a valid date!' }));
    //    return errorMessage;
    // }
  
    // const regex = /^(?:(?:19|20)\d\d|21[0-9]{2})[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])$|^([0-2][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/](?:19|20)\d\d$/;
  
    // if (!regex.test(formData.dob)) {
    //     errorMessage ={ ...errorMessage, dob:'Invalid date format. Use YYYY/MM/DD, DD/MM/YYYY, MM/DD/YYYY o YYYY-MM-DD'}

    // //   setFormData((prevData) => ({ ...prevData, dobMessage: 'Invalid date format. Use YYYY/MM/DD, DD/MM/YYYY, MM/DD/YYYY o YYYY-MM-DD' }));
    //   return errorMessage;
    // }
  
    // if (formData.enteredPassword === '') {
    //     errorMessage ={ ...errorMessage, enteredPassword:'Password is empty, please write a valid password!'}

    // //   setFormData((prevData) => ({ ...prevData, descriptionMessage: 'Description is empty, please write a valid description!' }));
    //    return errorMessage;
    // }

  //   if (formData.enteredPassword.length < 7) {
  //     errorMessage ={ ...errorMessage, enteredPassword:'Password is must be at leat 7 character, please write a valid password!'}

  // //   setFormData((prevData) => ({ ...prevData, descriptionMessage: 'Description is empty, please write a valid description!' }));
  //    return errorMessage;
  // }




    
  
    // if (formData.teams.length === 0) {
    //     errorMessage ={ ...errorMessage, teams:'Teams is empty, please select at least one team!' }
        
    // //   setFormData((prevData) => ({ ...prevData, teamsMessage: 'Teams is empty, please select at least one team!' }));
    //    return errorMessage;
    // }
  
    
    return errorMessage;
  };

 export default validateForm;