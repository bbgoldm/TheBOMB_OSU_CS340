import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Navigation(){
    return(
        <nav className = 'Header-nav'>
            <Link className = 'navLink' to="/Tanks"> Tanks</Link>
            <Link className = 'navLink' to="/TankTypes"> TankTypes</Link>
            <Link className = 'navLink' to="/Tasks"> Tasks</Link>
            <Link className = 'navLink' to="/Lineups"> Lineups</Link>
            <Link className = 'navLink' to="/Materials"> Materials</Link>
            <Link className = 'navLink' to="/Specifications"> Specifications</Link>
            <Link className = 'navLink' to="/Tests"> Tests</Link>
        </nav>
    )
}

export default Navigation;