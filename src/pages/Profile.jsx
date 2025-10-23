import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "../context/UserContext";

// Components
import Button from '../components/Button.jsx';

// Styling
import '../styling/Animations.css';
import '../styling/Wrapper.css';
import '../api/api.js';
import '../styling/Menu.css';

function Profile() {
    // State
    const [menuOpen, setMenuOpen] = useState(false);

    // Hooks
    const {user, setUser} = useUser();
    const navigate = useNavigate();

    // Handlers
    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }

    // Event listener
    useEffect(() => {
        const handler = (e) => {
            if (!e.target.closest('.menu-container')) setMenuOpen(false);
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);

    return (
        <div>
            <div className="menu-container">
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                {menuOpen && (
                    <div className="menu-dropdown">
                        <Button className="button-primary" text="Log out" onClick={handleLogout}/>
                    </div>
                )}
            </div>
            <div className="wrapper-profile">
                <h2 className="anim-profile-title">Welcome to your profile {user?.username}! </h2>
                <div className="button-primary-wrapper">
                    <Button className="button-4 anim-button-left" text="Popquiz" to="/quiz"/>
                    <Button className="button-4 anim-button-right" text="Lists" to="/lists"/>
                </div>
            </div>
        </div>
    );
}

export default Profile;
