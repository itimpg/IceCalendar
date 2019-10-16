import React from 'react';
import { Spinner } from 'react-bootstrap';

const loading = function () {
    return (
        <div className="center-screen">
           <Spinner animation="border" />
        </div>
    );
}

export default loading;