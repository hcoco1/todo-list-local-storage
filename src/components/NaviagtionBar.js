import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LogOutButton from '../components/auth/LogOutButton'; // Make sure the path is correct

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
        <Link className="navbar-brand" to="/">
          {currentUser && currentUser.photoURL && (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
            />
          )}
          {currentUser?.displayName || 'Guest'}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item me-3">
              <Link to="/" className="nav-link" style={{ fontSize: '14px', color: 'black', backgroundColor: 'orange', padding: '5px', borderRadius: '5px' }}>Audits</Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/dashboard" className="nav-link" style={{ fontSize: '14px', color: 'black', backgroundColor: 'rgb(190, 253, 128)', padding: '5px', borderRadius: '5px' }}>Charts</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link" style={{ fontSize: '14px', color: 'black', backgroundColor: 'rgb(120, 253, 178)', padding: '5px', borderRadius: '5px' }}>Profile</Link>
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

































/* import React, { useState } from 'react';
import LogOutButton from './LogOutButton'; // Ensure this path is correct

import { Link } from 'react-router-dom';

import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
    MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
    const [openNavColor, setOpenNavColor] = useState(false);


    return (
        <>
            <MDBNavbar expand='lg' dark bgColor='primary'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarColor02'
                        aria-controls='navbarColor02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavColor(!openNavColor)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse open={openNavColor} navbar>
                        <MDBNavbarNav className='me-auto mb-2 mb-lg- justify-content-center'>
                            <MDBNavbarItem className='active'>

                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBBtn size='lg' color='warning'><Link to="/">Audits</Link></MDBBtn>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                           
                                <MDBBtn size='lg' color='secondary'><Link to="/dashboard">Charts</Link></MDBBtn>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <LogOutButton />
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>

            <br />



            <br />


        </>
    );
}



 */