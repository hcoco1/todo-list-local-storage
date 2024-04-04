import React, { useState } from 'react';
import './SignIn.css'; // Ensure your CSS styles are appropriate for the SignUp form as well
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            console.log("Signed Up User:", userCredential.user); // You can remove this console log in production
            navigate('/signin'); // Redirect to the homepage or dashboard as appropriate for your app
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    return (
        <>
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div>
                    <label htmlFor="name">Amazon Login</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={isLoading}>{isLoading ? 'Signing Up...' : 'Sign Up'}</button>
            </form>
            <p style={{ textAlign: 'center' }}>
                Already have an account? <Link to="/signin">Sign In</Link>
            </p>
        </>
    );
}

export default SignUp;


