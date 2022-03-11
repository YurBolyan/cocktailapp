import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

function Registeration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);
  const history = useHistory();
  


  function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!name || !email || !password ) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem("sanskarEmail", JSON.stringify(email));
      localStorage.setItem(
        "sanskarPassword",
        JSON.stringify(password)
      );
      console.log("Saved in Local Storage");

      setLogin(!login);
    }
  }

  function handleClick() {
    setLogin(!login);
  }

  useEffect(()=> {
    if(!login){
      history.push('/login');
    }
  }, [login, history])

  

  return (
        <div>
          <h1>Cocktails app</h1>
            <form onSubmit={handleFormSubmit}>
            
            
              <h3>Register</h3>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              
             <button type="submit" className="btn btn-dark btn-lg btn-block">
                Register
              </button>
              <p onClick={handleClick} className="forgot-password text-right">
                Sign in
              </p>
              {flag && (
                <Alert color="primary" variant="danger">
                  I got it you are in hurry! But every Field is important!
                </Alert>
              )}
          

            </form>
        </div>
  );
}

export default Registeration;