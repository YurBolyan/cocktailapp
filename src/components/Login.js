import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components"


function Login() {
  const [emaillog, setEmaillog] = useState(" ");
  const [passwordlog, setPasswordlog] = useState(" ");

  const [flag, setFlag] = useState(false);
  const history = useHistory();
  const [home, setHome] = useState(true);

  function handleLogin(e) {
    e.preventDefault();
    let pass = localStorage
      .getItem("sanskarPassword")
      .replace(/"/g, "");
    let mail = localStorage.getItem("sanskarEmail").replace(/"/g, "");
    

    if (!emaillog || !passwordlog) {
      setFlag(true);
      console.log("EMPTY");
    } else if (passwordlog !== pass || emaillog !== mail) {
      setFlag(true);
    } else {
      setHome(!home);
      setFlag(false);
    }
  }

 

  useEffect(()=> {
    if(!home){
      history.push('/home');
    }
  }, [home, history])

  function navigateRegistration () {
    history.push('/')
  }

  
  const RegistrationInputs = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: #fff;
  padding: 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`

  return (
    <div>
      <RegistrationInputs>
        <form onSubmit={handleLogin}>
          <h3>Login</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(event) => setEmaillog(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(event) => setPasswordlog(event.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark btn-lg btn-block">
            Login
          </button>

          {flag && (
            <Alert color="primary" variant="warning">
              Fill correct Info else keep trying.
            </Alert>
          )}
        </form>
        <p onClick={navigateRegistration}>Sign up</p>
        </RegistrationInputs>
      </div>
  );
}

export default Login;