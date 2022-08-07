import React from 'react';
import { Link } from 'react-router-dom';
import flowDiagram from '../static/BOMB Generic Layout.png';


// import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage() {
    // When a variable is within useState and it changes then the React App will re-render the DOM
    const history = useHistory();
    // const TankPage = "./TankPage"
    return (
        <>
            <h2> Welcome to the BOMB!</h2>
            <p>Edit the tables in the database via the links above.</p>
            {/* <ul>
                <li><Link to="./Tanks">Tanks</Link></li>
                <li><Link to="./TankTypes">Tank Types</Link></li>
                <li><Link to="./Tasks">Tasks</Link></li>
                <li><Link to="./Lineups">Lineups</Link></li>
                <li><Link to="./Materials">Materials</Link></li>
                <li><Link to="./Specifications">Specifications</Link></li>
                <li><Link to="./Tests">Tests</Link></li>
            </ul> */}
            <div id='articleDiv'>
            <article>
            <p>The BOMB is a tank and lineup tracking tool used for completing tasks (the production of various finished products).</p>
            <br></br>
            <p>Each of the <em>Tanks</em>  is one of many <em>TankTypes</em>  and contain
            <em>Materials</em>  that meet certain <em>Specifications</em> .  Each tank can either
            be a source tank or a destination tank.  Finished product is produced via <em>Tasks</em>  that 
            specify how to route one or more source tanks to a single destination tank.  
            The M:M table <em>Lineups</em>  keeps track of the connections between <em>Tanks</em>  and
            <em>Tasks</em>  while the M:M table <em>Specifications</em>  keeps track of the connections
            between <em>Materials</em>  and <em>Tests</em> .
            </p>
            <br></br>
            <p>The BOMB is the tool that helps Big Oil achieve their highest priority objectives:</p>
            <ol>
                <li>Achieve zero safety incidents by monitoring the level in each of the tanks.</li>
                <li>Make on-spec fuels by identifying conflicting tasks and thus preventing cross-contamination.</li>
                <li>Optimize the blending process by providing all of the data necessary to interface with a blend optimizer.</li>
            </ol>
            <p>Below is a generic diagram showing the various components.</p>
            <img src={flowDiagram} alt="BOMB generic flow diagram"></img>
            </article>
            </div>
        </>
    );
}

export default HomePage;