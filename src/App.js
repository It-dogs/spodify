import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/login";
import SignUp from "./views/sipnUp";
import ForgotPw from "./views/forgotPw";
import Main from "./views/main";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" caseSensitive={false} element={ <Login /> } />
        <Route path="/sign_up" caseSensitive={false} element={ <SignUp /> } />
        <Route path="/forgot/password" caseSensitive={false} element={ <ForgotPw /> } />
        <Route path="/home" caseSensitive={false} element={ <Main /> } />
      </Routes>
    </Router>
  );
}

export default App;
