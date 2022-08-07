import React from "react";
import { Link } from "react-router-dom";
// import { MdHome } from 'react-icons/md';
// import NewExerciseIcon from './newExerciseIcon';
// import home from '../home.png';
import home2 from '../static/home6.png';
// import newExercise from "../newExercise.png";
// import Navigation from "./Navigation";

function Header() {
  return (
    <>
        <hr></hr>
          <nav className ="navbarheader">
            <div className = "navLeft"></div>
              <div className = "navCenter">
                <header>
                    <h1>Blending Oil Movements Bonanza</h1>
                    <h4> A React/Express/MySql Project for CS340 Databases</h4>
                </header>
              </div>
              <div className ="navRight" >
                <Link to="/"><img className="imgClass" src={home2} height="125px"></img></Link>
             </div>
                {/* <Link to="/create-test"><img src={newExercise} height="100px"></img></Link> */}
          </nav>
        <hr></hr>
    </>
  );
}
export default Header;