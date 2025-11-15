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
import '../styling/Input.css'

function Profile() {
    // State
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Hooks
    const {user, setUser} = useUser();
    const navigate = useNavigate();


    // image uploading
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const token = localStorage.getItem("token"); // JWT voor auth
            const response = await fetch(`http://localhost:8080/api/auth/users/${user.id}/profile-image`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) throw new Error("Upload failed");

            const updatedUser = await response.json();
            setUser(updatedUser); // update context zodat profielfoto meteen zichtbaar is
            setSelectedFile(null);
            alert("Profile image updated!");
            setSelectedFile(null);
        } catch (err) {
            console.error(err);
            alert("Error uploading profile image");
        } finally {
            setUploading(false);
        }
    };
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

            {/*image*/}
            <div className="wrapper-profile">
                <div className="profile-image-upload">
                    {user?.profileImage && (
                        <img
                            src={`http://localhost:8080${user.profileImage}`}
                            alt="Profile"
                            className="profile-img"
                        />
                    )}
                    {!user?.profileImage && (
                        <div>
                            <input type="file" onChange={handleFileChange}/>
                            <button
                                className="button-primary"
                                onClick={handleUpload}
                                disabled={!selectedFile || uploading}
                            >
                                {uploading ? "Uploading..." : "Upload Photo"}
                            </button>
                        </div>
                    )}
                </div>


                {/*title and buttons Quiz Lists*/}
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
