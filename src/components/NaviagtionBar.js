import '../App.css';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LogOutButton from '../components/auth/LogOutButton'; // Adjust the path as necessary

const NavigationBar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // user will be null if not logged in
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light rounded">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          {currentUser && currentUser.photoURL && (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
            />
          )}
          {currentUser?.displayName || 'Guest'}
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item me-4">
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                style={({ isActive }) => ({
                  fontSize: '14px',
                  color: isActive ? 'white' : 'black', // Change text color when active
                  backgroundColor: isActive ? 'green' : 'orange', // Change background color when active
                  padding: '5px',
                  borderRadius: '5px'
                })}>
                Audits
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                style={({ isActive }) => ({
                  fontSize: '14px',
                  color: isActive ? 'white' : 'black',
                  backgroundColor: isActive ? 'blue' : 'rgb(190, 253, 128)',
                  padding: '5px',
                  borderRadius: '5px'
                })}>
                Charts
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/links"
                className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                style={({ isActive }) => ({
                  fontSize: '14px',
                  color: isActive ? 'white' : 'black',
                  backgroundColor: isActive ? 'purple' : 'rgb(220, 153, 178)',
                  padding: '5px',
                  borderRadius: '5px'
                })}>
                Links
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/profile"
                className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                style={({ isActive }) => ({
                  fontSize: '14px',
                  color: isActive ? 'white' : 'black',
                  backgroundColor: isActive ? 'red' : 'rgb(120, 253, 178)',
                  padding: '5px',
                  borderRadius: '5px'
                })}>
                Profile
              </NavLink>
            </li>
          </ul>
          {currentUser && (
            <div className="navbar-nav">
              <div className="nav-item d-flex align-items-center justify-content-center">
                <LogOutButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;



