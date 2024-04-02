import React from 'react'
import { Link } from 'react-router-dom';
import LogOutButton from './LogOutButton'; // Ensure this path is correct

function NaviagtionBar() {
    return (
        <>
<nav class="navbar navbar-expand-lg bg-light rounded-3">
    <div class="container-fluid justify-content-between">
    <img src="/favicon.ico" alt="Bootstrap"/>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item me-3">
                    <Link to="/" style={{ fontSize: '18px', color: 'black', backgroundColor: 'orange', padding: '10px', borderRadius: '5px' }}>Audits</Link>
                </li>
                <li class="nav-item">
                    <Link to="/dashboard" style={{ fontSize: '18px', color: 'white', backgroundColor: 'green', padding: '10px', borderRadius: '5px' }}>Charts</Link>
                </li>
            </ul>
            <ul class="navbar-nav"> {/* Wrap Logout button in its own nav-item for alignment */}
                <li class="nav-item">
                    <LogOutButton />
                </li>
            </ul>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
</nav>


        </>

    )
}

export default NaviagtionBar































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