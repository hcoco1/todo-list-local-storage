import React, { useEffect, useState } from 'react';
import { auth } from './firebase-config';

function Greeting({ todos }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUserName(user ? user.displayName || 'there' : 'Guest');
        });
        return () => unsubscribe();
    }, []);

    return (
        <h1>
            Hello {userName || 'Guest'}! 
            
        </h1>
    );
}

export default Greeting;




