import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./views/login";
import SignUp from "./views/sipnUp";
import ForgotPw from "./views/forgotPw";
import Main from "./views/main";


function App() {
  const [token, setToken] = useState(null);
  
  //get token
  useEffect(() => {
    const resToken = window.location.hash && window.location.hash.substring(1).split("&")[0].split("=")[1];
    console.log(resToken);
    resToken && setToken(resToken);
  }, []); 

  return (
    <Router>
      <Routes>
        <Route path="/" caseSensitive={false} element={ token? <Navigate to="/home" />:<Login /> } />
        <Route path="/callback" caseSensitive={false} element={ token? <Navigate to="/home" />:<Login /> } />
        <Route path="/sign_up" caseSensitive={false} element={ <SignUp /> } />
        <Route path="/forgot/password" caseSensitive={false} element={ <ForgotPw /> } />
        <Route path="/home" caseSensitive={false} element={ token? <Main />:<Navigate to="/" /> } />
      </Routes>
    </Router>
  );
}

export default App;
