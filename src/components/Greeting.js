import React, { useEffect, useState } from 'react';
import { auth } from './firebase-config';
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
        <h6>
        
                <strong>User:</strong>{userName || 'Guest'}
       


        </h6>
    );
}

export default Greeting;






