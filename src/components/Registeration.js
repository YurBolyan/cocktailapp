import React, { useEffect, useState, useContext } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import { FormattedMessage } from "react-intl";
import { Context } from "../components//Wrapper"

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

const CocktailApp = styled.div`
  background: rgb(138, 238, 130);
  color: rgb(60,60,60);

`

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

  
 const context = useContext(Context)
  return (
        <div>
           <CocktailApp>
          <h1>Cocktails app</h1>
          </CocktailApp>
          <select value={context.locale} onChange={context.selectLang}>
            <option value="en-US">English</option>
            <option value="hy-AM">Armenian</option>
          </select>
         
            <form onSubmit={handleFormSubmit}>
            
              <InputContainer>
             <h2> <FormattedMessage
                id="register"
                defaultMessage="register"
              /></h2>
                <div>
                 <FormattedMessage
                  id="name"
                  defaultMessage="Name"
                 />
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    className="form-control"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                  />
                  
                  
                </div>
              <div className="form-group">
              <FormattedMessage
                  id="email"
                  defaultMessage="Email"
                 />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group">
              <FormattedMessage
                  id="password"
                  defaultMessage="password"
                 />
                {/* <label>Password</label> */}
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-dark btn-lg btn-block">
              <FormattedMessage
                id="register"
                defaultMessage="register"
              />
              </button>
              <p onClick={handleClick} className="forgot-password text-right">
                <FormattedMessage
                  id="signIn"
                  defaultMessage="sign in"
                />
              </p>
              {flag && (
                <Alert color="primary" variant="danger">
                  <FormattedMessage
                    id="error.message"
                    defaultMessage="I got it you are in hurry! But every Field is important!"
                  />
                </Alert>
              )}
              </InputContainer>
           
             
          

            </form>
        </div>
  );
}

export default Registeration;