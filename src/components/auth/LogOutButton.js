import React from 'react';
import './LogOutButton.css'; // Assuming you have a simple button CSS
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config"; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

function LogOutButton() {
    const handleLogout = async () => {
        const navigate = useNavigate();
        try {
            await signOut(auth);
            navigate('/signin');

        } catch (error) {
            // Handle logout error if necessary
            console.error("Logout Error:", error.message);
        }
    };

    return (
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
    );
}

export default LogOutButton;

