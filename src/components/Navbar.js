import React from 'react';

// Import your CSS file if you're using CSS for styling
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <button className="nav-item">Home</button>
            <button className="nav-item">Sign In</button>
            <button className="nav-item">Sign Up</button>
            <button className="nav-item">Log Out</button>
        </nav>
    );
}

export default Navbar;
