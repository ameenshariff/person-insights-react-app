import React from 'react';
import { Link } from "react-router-dom";

function NavBar(props) {
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/history">History</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;