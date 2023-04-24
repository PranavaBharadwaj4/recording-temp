import {Fragment} from 'react';
import Chat from '../components/Chat';
import { useState, useEffect } from 'react';


const Base = () => {

  // useEffect( async () => {
  //   // Scroll to the bottom of the chat window on initial load and whenever new messages are added
  //   const response = await fetch('/home', {
  //   });
  //   console.log(response)
  // }, []);


  return (
    <>
      <body style={{ background: 'skyblue' }}>
        <nav className="navbar navbar-default" style={{ background: 'darkblue', borderColor: 'darkblue' }}>
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand">Chat</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="/" style={{ color: 'white', fontSize: '18px' }}>Home</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {/* {request.user.is_anonymous ? ( */}
                  <>
                    <a href="/accounts/login/"><button type="button" className="btn navbar-btn btn-success">Sign in</button></a>
                    <a href="/accounts/signup/"><button type="button" className="btn navbar-btn btn-success">Register</button></a>
                  </>
                {/*  ) : ( */}
                {/*   <a href="/accounts/logout/"><button type="button" className="btn btn-danger navbar-btn">Log out</button></a> */}
                {/*  )} */}
              </ul>
            </div>
          </div>
        </nav>

        <header className="body-header">
          <div className="body-header__title">
            <h1 className="text-center">Speech To text live chat</h1>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <p className="lead text-center">Please Login! to the website</p>
          </div>
        </div>
        <Chat />

        
        </body>
    </>
    
      
    
)
  }
export default Base;