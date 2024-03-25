import React from 'react';
import './LogOutButton.css'; // Assuming you have a simple button CSS
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config"; // Adjust the import path as necessary

function LogOutButton() {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            // User is now signed out
            // Redirect to the homepage or login page
            // This redirection might depend on your routing setup. For example, you could use:
            // window.location.href = '/login'; // Plain JS redirect, or use your routing library's redirect method
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

