import React from 'react';
import {Link} from "react-router-dom";

function Error(props) {
    return (
        <div>
            <h1>Error 404</h1>
            <Link to='/'>Back to index</Link>
        </div>
    );
}

export default Error;