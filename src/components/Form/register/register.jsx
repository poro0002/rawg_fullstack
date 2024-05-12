import { useState, useEffect } from "react";
import Input from "../Input/input";
import NavBar from '../../Navbar/navbar';
import './register.css'


function Register({ handleLogin }){

const [formData, setFormData] = useState({})
const [logData, setLogData] = useState({})
const [errorMsg, setErrorMsg] = useState("")
const [regFormOpen, setRegFormOpen ] = useState(false);



// -----------------------------------------const--------------------------< FORM CHANGE >

// e.target is an object that holds the properties of the corresponding event
// this will store objects of input value information from the form
// e.target can be so it/deconstructed into two variables. name will be the name properly of the corresponding input
// value will be the value of the the input
function onChange(e){
   const {name, value} = e.target;
   // spread is used so each input data key and value would be added to the same object
   // [name] to set a dynamic property key 
    if (regFormOpen) {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    } else {
        setLogData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
}





   // we have to use two different useEffect hooks to keep up with the form data
   useEffect(() => {
    console.log(formData);
}, [formData]);

    useEffect(() => {
        console.log(logData);
    }, [logData]);




// -------------------------------------------------------------------< FORM TOGGLE >

function toggleForm() {
    // changes the value of regFormOpen to its opposite
    setRegFormOpen((prev) => !prev);
    
    
    let newUrl = regFormOpen ? 'login' : 'register';
    window.history.pushState(null, '', `/${newUrl}`);
  
  }


  // -------------------------------------------------------------------< JWT FUNCTION>


// -------------------------------------------------------------------< REG SUBMIT >

// here we will check to see if the account credentials are valid in each input. RULES
// if it all checks out we will create a JWT token for the user and store their account  info in the database
function regSubmit(e){
   e.preventDefault();
   let newUrl = regFormOpen ? 'register' : 'login';
    window.history.pushState(null, '', `/${newUrl}`);

    console.log(formData)
   
   setErrorMsg("");
   
    let registerRules = [
        {
            usernameRules: [
                {
                    condition: value => value.length >= 6,
                    message: () => setErrorMsg("Username must be at least 6 digits long")
                }
            ]
        },
        {
            passwordRules: [
                { condition: value => value.length >= 8, message: () => setErrorMsg("Password must be at least 8 characters long.") },
                { condition: value => /[a-z]/.test(value), message: () => setErrorMsg("Password must contain at least one lowercase letter.") },
                { condition: value => /[A-Z]/.test(value), message: () => setErrorMsg("Password must contain at least one uppercase letter.") },
                { condition: value => /\d/.test(value), message: () => setErrorMsg("Password must contain at least one digit.") },
                { condition: value => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), message: () => setErrorMsg("Password must contain at least one of the symbols.") },
            ]
        },
        {
            emailRules: [
                {
                    condition: value => /^[^ ]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$/.test(value),
                    message: () => setErrorMsg("Must be a valid Email")
                }
            ]
        }
    
    ];

     let usernameRules = registerRules[0].usernameRules[0].condition;
     let passRules = registerRules[1].passwordRules;
     let emailRules = registerRules[2].emailRules[0].condition;
   

     // all  password conditions true
     let passwordConditions = true; 
     passRules.forEach(rule => {
         if (!rule.condition(formData.confirm)) {
             rule.message(); 
             passwordConditions = false; 
         }
     });

     // username error
    if(!usernameRules(formData.username)){
        registerRules[0].usernameRules[0].message();
    }

     // email error
     if(!emailRules(formData.email)){
        registerRules[2].emailRules[0].message();
    }


    //  make sure both password inputs match
    const confirmPass = formData.pass === formData.confirm;

    if(!confirmPass){
        setErrorMsg("passwords do not match"); 
    }


     if(usernameRules(formData.username) && passwordConditions && confirmPass && emailRules(formData.email) ){
         // submission will go through if all run true
         //create a token for the user as well
         

        let regHeaders = new Headers();
        regHeaders.append("Content-Type", "application/json");
        let baseUrl = 'http://localhost:3500';
        
        let regUrl = baseUrl + '/register';

        let regRequest = new Request(regUrl, {
                method: "POST",
                mode: "cors",
                headers: regHeaders,
                body: JSON.stringify(formData)
        })


        fetch(regRequest)
        .then((res)=> {

            // if you get an issue with the response its probably the schema not matching up
            // also get rid of this once you start sending error objects back from the server api
                // if(!res.ok){
                //     throw new Error("network response was NOT ok")
                // }

            return res.json()
        })
        .then(data => {
            
           console.log(data)
             if(data.error === 'username is taken'){
                setErrorMsg(data.error)
             }
             else if(data.error === "There is an account associated with this email already"){
                setErrorMsg(data.error)
             } else if(data.message === 'User registered successfully'){
                let token = data.token; // grabs token
                localStorage.setItem('jwtToken', token); 
                localStorage.setItem('userID', data.userID); 
                window.location.href = "/login";
                alert('Successfully Registered Account')
                
             }
        })
        .catch(err => {
            console.error('Error:', err);
        });
        }

     
    
}

// -------------------------------------------------------------------< LOG SUBMIT >

function logSubmit(e){
    
    e.preventDefault();
    let newUrl = regFormOpen ? 'register' : 'login';
    window.history.pushState(null, '', `/${newUrl}`);
    setErrorMsg("");
    

    let logHeaders = new Headers();
    logHeaders.append("Content-Type", "application/json");
    let baseUrl = 'http://localhost:3500';
    
    let logUrl = baseUrl + '/login';

    let logRequest = new Request(logUrl, {
            method: "POST",
            mode: "cors",
            headers: logHeaders,
            body: JSON.stringify(logData)
    })



    fetch(logRequest)
    .then(res=> {

        // if you get an issue with the response its probably the schema not matching up
        // also get rid of this once you start sending error objects back from the server api
            // if(!res.ok){
            //     throw new Error("network response was NOT ok")
            // }

        return res.json()
    })
    .then(data => {
        
        console.log(data)
         if(data.error === 'no account with that username'){
               setErrorMsg(data.error)
         }  else if(data.error === "wrong username or password"){
               setErrorMsg(data.error)
         }  else if(data.message === 'User logged successfully'){
            let token = data.token; // grabs token
            localStorage.setItem('jwtToken', token); 
            localStorage.setItem('userID', data.userID); 
            handleLogin(data); 
            // ^^^ if the server matches the client username and pass to the DB user stored
            // we set that data that we got back into the local storage 
            // the, run the passed down handle login function with the data as the parameter
         
            
            
         }else if(data.error === 'there was an issues trying to login'){
            setErrorMsg(data.error)
         }
     
    })
    .catch(err => {
        console.error('Error:', err);
    });

}


    return (
        <>

     {regFormOpen && (
        <form className="reg-form " action="submit" onSubmit = {regSubmit}>
            <div className="form-grid">
                    <fieldset>
                
                        <legend>
                            <h1>Register</h1>
                        </legend>

                        <div className="form-unit">
                            <p className="regFormError">{errorMsg}</p>
                       </div>
                    
                    <div className="form-unit">
                                <Input 
                                    name='fName'
                                    label='First Name'
                                    type="text"
                                    required
                                    autofocus
                                    id="fName"
                                    value={formData.fName}
                                    onChange={onChange}
                                />
                    </div>

                    <div className="form-unit">
                                <Input 
                                    name='lName'
                                    label='Last Name'
                                    type="text"
                                    required
                                    autofocus
                                    id="lName"
                                    value={formData.lName}
                                    onChange={onChange}
                                />
                    </div>

                    <div className="form-unit">
                        
                        <Input 
                        name='username'
                        label='Username'
                        type="text"
                        required
                        autofocus
                        value={formData.username}
                        id="username"
                        onChange={onChange}
                        />
                
                    </div>

                    <div className="form-unit">
                        
                                <Input 
                                name='pass'
                                label='Password'
                                type="text"
                                required
                                autofocus
                                value={formData.pass}
                                id="pass"
                                onChange={onChange}
                                />
                        
                    </div>

                    <div className="form-unit">
                        
                                <Input 
                                    label='Confirm Password'
                                    name='confirm'
                                    type="text"
                                    required
                                    autofocus
                                    value={formData.confirm}
                                    id="confirm"
                                    onChange={onChange}
                                />
                        
                    </div>

                    <div className="form-unit">
                        
                                <Input 
                                    name="email"
                                    label="Email"
                                    type="text"
                                    required
                                    autofocus
                                    value={formData.email}
                                    id="email"
                                    onChange={onChange}
                            
                                />
                        
                    </div>


                    <div className="form-unit" >
                        
                                <Input 
                                    
                                    name="reg-btn"
                                    type="submit"
                                    required
                                    autofocus
                                    id="reg-btn"
                                    
                                />
                            
                    </div>
   
            </fieldset>
        </div>
        <div className="alt-text">
            <a onClick={toggleForm}>have an account already ?</a>
        </div>
    </form>
)}

{!regFormOpen && (
    <form className="log-form " action="submit" onSubmit = {logSubmit}>
            <div className="form-grid">
                <fieldset>
                   
                    <legend>
                        <h1>Login</h1>
                    </legend>

                    <div className="form-unit">
                            <p className="logFormError">{errorMsg}</p>
                       </div>
                 
                  <div className="form-unit">
                            <Input 
                                name='username'
                                label='Username'
                                type="text"
                                required
                                autofocus
                                id="uName"
                                value={logData.username}
                                onChange={onChange}
                            />
                   </div>

                 

                  <div className="form-unit">
                    
                            <Input 
                            name='pass'
                            label='Password'
                            type="text"
                            required
                            autofocus
                            value={logData.pass}
                            id="pass"
                            onChange={onChange}
                            />
                       
                  </div>
  


                  <div className="form-unit" >
                    
                            <Input 
                                
                                name="log-btn"
                                type="submit"
                                value='Login'
                                required
                                autofocus
                                id="log-btn"
                                
                            />
                        
                  </div>
       
            </fieldset>
            </div>
            <div className="alt-text">
                <a onClick={toggleForm}>dont have an account ? register here </a>
            </div>
        </form>

        )}
    </>
    )
}


export default Register
