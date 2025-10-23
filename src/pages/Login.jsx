import React, {useState} from 'react';
import {jwtDecode} from 'jwt-decode';

console.log(jwtDecode(localStorage.getItem("token")));
import api from "../api/api.js";
import {useNavigate} from 'react-router-dom';
import {useUser} from "../context/UserContext.jsx";

// Components
import Button from "../components/Button.jsx";

// Styling
import '../styling/Input.css'

function Login() {
    // State
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    // Hooks
    const {setUser} = useUser();
    const navigate = useNavigate();

    // Handlers
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    // API connection
    async function handleLogin(e) {
        e.preventDefault();
        console.log("LOGIN FUNCTION TRIGGERED"); // voeg dit toe
        try {
            const response = await api.post("/auth/login", {
                username: form.username,
                password: form.password,
            });

            const token = response.data.token;
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            const userObj = {
                id: decoded.id ?? decoded.userId ?? null,
                username: decoded.sub,
                roles: decoded.roles || [],
                token,
            };
            setUser(userObj);

            navigate("/profile");
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        try {
            await api.post("/auth/register", {
                username: form.username,
                email: form.email,
                password: form.password,
                role: "QUIZTAKER",
            });
            alert("Registration successful. Please log in.");
            setForm({username: "", email: "", password: ""});
            setIsRegister(false);
        } catch (err) {
            console.error("Registration failed:", err.response?.data || err.message);
        }
    }

    return (
        <div className="auth-container">
            <Button className="button-primary nav-pages-right" text="Back to home" to="/"/>
            {isRegister ? (
                <form className="login-form" onSubmit={handleRegister}>
                    <h2 className="form-title">Register</h2>

                    <div className="form-group">
                        <label className="form-label">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">Sign Up</button>
                    <p className="switch-text">
                        Already have an account?{' '}
                        <button type="button" className="switch-button" onClick={() => setIsRegister(false)}>
                            Login
                        </button>
                    </p>
                </form>
            ) : (
                <form className="login-form" onSubmit={handleLogin}>
                    <h2 className="form-title">Login</h2>

                    <div className="form-group">
                        <label className="form-label">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">Login</button>
                    <p className="switch-text">
                        Don't have an account?{' '}
                        <button type="button" className="switch-button" onClick={() => setIsRegister(true)}>
                            Sign Up
                        </button>
                    </p>
                </form>
            )}
        </div>
    );
}

export default Login;
