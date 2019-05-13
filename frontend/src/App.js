import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import LoginSignup from './components/loginsignup';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Urls from './components/urls';
import 'bootstrap/dist/css/bootstrap.css';
function Home(){
  let token = localStorage.getItem('access-token');
  if(token){
    return(<Redirect to="/urls"/>)
  }else{
  return(
    <div>
      <div className="row mt-5">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="alert alert-info p-5"><h3>WellCome to Url Shotaner</h3></div>
          </div>
        <div className="col-md-3"></div>
      </div>
      <div className="row mt-5">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="alert alert-secondary">
            <Link to="/ls">To Log in <span className="alert-link">click Here</span></Link>
          </div>
          </div>
        <div className="col-md-3"></div>
      </div>
        
    </div>
  )
}
}
function App() {
  return (
    <div className="App">
      {/* <LoginSignup/> */}
      <Router>
        <Route path="/" exact component={Home}></Route>
        <Route path="/ls" component={LoginSignup}></Route>
        <Route path="/urls" component={Urls}></Route>
      </Router>
    </div>
  );
}

export default App;
