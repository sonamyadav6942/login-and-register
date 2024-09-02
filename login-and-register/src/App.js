import React, { useState } from "react";
import './App.css';
import Homepage from './components/homepage/homepage.js';
import Login from './components/login/login.js';
import Register from './components/register/register.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user && user._id ? (
                <Homepage setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
