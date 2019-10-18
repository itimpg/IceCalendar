import React from 'react';
import { Navbar } from 'react-bootstrap';

const SiteNavbar = function () {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">
                {'Ice Calendar'}
            </Navbar.Brand>
        </Navbar>
    )
}

export default SiteNavbar;