import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Context } from "../components/Wrapper";


const InputContainer = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 400px;
background: forestgreen;
opacity: 0.75;
padding: 40px;
border: 1px solid rgba(0, 0, 0, 0.1);
box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

`

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

  

  const context = useContext(Context)

  return (
    <div>
       <select value={context.locale} onChange={context.selectLang}>
            <option value="en-US">English</option>
            <option value="hy-AM">Armenian</option>
          </select>
        <form onSubmit={handleLogin}>
          <InputContainer>
         <h2> <FormattedMessage
              id="login"
              defaultMessage="register"
            />
          </h2>

          <div className="form-group">
            <FormattedMessage 
              id="email"
              defaultMessage="email"
            />

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(event) => setEmaillog(event.target.value)}
            />
            
            
          </div>

          <div className="form-group">
            <FormattedMessage
              id="password"
              defaultMessage="password"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(event) => setPasswordlog(event.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark btn-lg btn-block">
            <FormattedMessage
              id="login"
              defaultMessage="login"
            />
          </button>

          {flag && (
            <Alert color="primary" variant="warning">
              <FormattedMessage
                id="error.message.login"
                defaultMessage="Fill correct Info else keep trying."
              />
            </Alert>
          )}
        <p onClick={navigateRegistration}>
          <FormattedMessage
            id="signUp"
            defaultMessage="register"
         /></p>

          </InputContainer>
        </form>
      </div>
  );
}

export default Login;