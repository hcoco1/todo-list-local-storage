import React, { useState } from 'react';
import './SignIn.css'; // Update this line with the correct path to your CSS file

/* import './AuthForm.css'; // Assuming similar styling for all auth forms */
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config"; // Adjust the import path as necessary
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Directly use signInWithEmailAndPassword in the handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // User is signed in
            // Redirect user to the homepage or dashboard after successful sign in
            console.log(userCredential.user); // For demonstration; remove or replace with redirect
        } catch (error) {
            // Handle login error (e.g., wrong credentials)
            setError(error.message);
        }
    };

    return (
        <div>
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Sign In</button>
            </form>
            <p style={{ textAlign: 'center' }} >
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>

    );
}

export default SignIn;
