import React, { useState, useRef } from 'react';

import Body from './components/Body/Body';

import './App.css';

const App = () => {
  const [autorizaton, setAutorizaton] = useState(false);
  const [message, setMessage] = useState(null);
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const checkLoginPass = () => {
    if (
      loginRef.current.value === 'admin' && 
      passwordRef.current.value === 'admin'
    ) {
      setAutorizaton(true);
      } else {
        setMessage('incorect login or password')
      }
  }

  return (
    <section className="main-section">
      {
        !autorizaton &&
        <div className="wrapper-autorization">
          <div className="box-autorization">
            <span className="title-autorization">
              Autorization
            </span>
            <span className="message">
              {message}
            </span>
            <div className="wrapper-login-password">
              <div className="wrapper-login">
                <span className="text-autoriztion">
                  login
                </span>
                <input 
                  ref={loginRef}
                  className="input-login"
                  defaultValue="admin"
                >
                </input>
              </div>
              <div className="wrapper-password">
               <span className="text-autoriztion">
                  password
                </span>
                <input 
                  ref={passwordRef}
                  className="input-password"
                  defaultValue="admin"
                >
                </input>
              </div>
              <button 
                className="autorization"
                onClick={() => checkLoginPass()}
              >
              login
            </button>
            </div>
          </div>
        </div>
      }
      {
        autorizaton &&
        <Body/>
      }
    </section>
  );
}
export default App;
