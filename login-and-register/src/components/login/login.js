import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoginUser }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const login = () => {
        if (user.email && user.password) {
            axios.post("http://localhost:3002/login", user)
                .then(res => {
                    alert(res.data.message);
                    setLoginUser(res.data.user);
                    navigate("/");
                })
                .catch(err => {
                    console.error("Login error:", err.response ? err.response.data : err.message);
                    alert("Login failed. Please try again.");
                });
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <input
                className="input"
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your Email"
            />
            <input
                className="input"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your Password"
            />
            <button
                className="button"
                onClick={login}
            >
                Login
            </button>
            <div>or</div>
            <button
                className="button"
                onClick={() => navigate("/register")}
            >
                Register
            </button>
        </div>
    );
};

export default Login;
