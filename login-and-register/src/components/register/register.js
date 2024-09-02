import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
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

    const register = () => {
        const { name, email, password } = user;
        if (name && email && password) {
            axios.post("http://localhost:3002/register", user)
                .then(res => {
                    alert(res.data.message);
                    navigate("/login");
                })
                .catch(err => {
                    console.error("Registration error:", err.response ? err.response.data : err.message);
                    alert("Registration failed. Please try again.");
                });
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <input
                className="input"
                type="text"
                name="name"
                value={user.name}
                placeholder="Your Name"
                onChange={handleChange}
            />
            <input
                className="input"
                type="email"
                name="email"
                value={user.email}
                placeholder="Enter your Email"
                onChange={handleChange}
            />
            <input
                className="input"
                type="password"
                name="password"
                value={user.password}
                placeholder="Enter your Password"
                onChange={handleChange}
            />
            <button
                className="button"
                onClick={register}
            >
                Register
            </button>
            <div>or</div>
            <button
                className="button"
                onClick={() => navigate("/login")}
            >
                Login
            </button>
        </div>
    );
};

export default Register;
