import React from 'react';
import './LogOutButton.css'; // Assuming you have a simple button CSS
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config"; // Adjust the import path as necessary

function LogOutButton() {
    const handleLogout = async () => {
        try {
            await signOut(auth);

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

