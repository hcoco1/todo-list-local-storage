import React, { useEffect, useState } from 'react';
import { auth } from './config/firebase-config';
import './Greeting.css';

function Greeting({ todos }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUserName(user ? user.displayName || 'there' : 'Guest');
        });
        return () => unsubscribe();
    }, []);

    return (
    
        
                
                <button className="user-button">User: <strong style={{ color: 'red' }}> {userName || 'Guest'} </strong></button>
       


    
    );
}

export default Greeting;






