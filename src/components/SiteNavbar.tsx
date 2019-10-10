import React from 'react';
import { Navbar } from 'react-bootstrap';

const SiteNavbar = function () {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                {'Ice Calendar'}
            </Navbar.Brand>
        </Navbar>
    )
}

export default SiteNavbar;