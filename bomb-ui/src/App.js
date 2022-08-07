import './App.css';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// Non database pages and components
import HomePage from './pages/HomePage';
import Header from './components/header';
import Footer from './components/footer';
import Navigation from './components/Navigation';

// References to tables directly
import TankTypePage from './pages/TankTypePage';
import TankPage from './pages/TankPage';
import TaskPage from './pages/TaskPage';
import LineupPage from './pages/LineupPage';
import MaterialPage from './pages/MaterialPage';
import SpecificationPage from './pages/SpecificationPage';
import TestPage from './pages/TestPage';

// References to edit pages
import EditTankTypePage from './pages/EditTankTypePage';
import EditTankPage from './pages/EditTankPage';
import EditTaskPage from './pages/EditTaskPage';
import EditLineupPage from './pages/EditLineupPage';
import EditMaterialPage from './pages/EditMaterialPage';
import EditSpecificationPage from './pages/EditSpecificationPage';
import EditTestPage from './pages/EditTestPage';

// References to create pages
import CreateTankTypePage from './pages/CreateTankTypePage';
import CreateTankPage from './pages/CreateTankPage';
import CreateTaskPage from './pages/CreateTaskPage';
import CreateLineupPage from './pages/CreateLineupPage';
import CreateMaterialPage from './pages/CreateMaterialPage';
import CreateSpecificationPage from './pages/CreateSpecificationPage';
import CreateTestPage from './pages/CreateTestPage';

function App() {
  const [tankTypeToEdit, setTankTypeToEdit] = useState([]);
  const [tankToEdit, setTankToEdit] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState([])
  const [lineupToEdit, setLineupToEdit] = useState([])
  const [materialToEdit, setMaterialToEdit] = useState([])
  const [specificationToEdit, setSpecificationToEdit] = useState([])
  const [testToEdit, setTestToEdit] = useState([])

  return (
    <div className="App">
      <Router>
        <Header />
        <Navigation />
            <Switch>
              {/* To the tables directly */}
                <Route exact path="/" component={HomePage}></Route>
                <Route path="/TankTypes"><TankTypePage setTankTypeToEdit={setTankTypeToEdit}/></Route>
                <Route path="/Tanks"><TankPage setTankToEdit={setTankToEdit}/></Route>
                <Route path="/Tasks"><TaskPage setTaskToEdit={setTaskToEdit}/></Route>
                <Route path="/Lineups"><LineupPage setLineupToEdit={setLineupToEdit}/></Route>
                <Route path="/Materials"><MaterialPage setMaterialToEdit={setMaterialToEdit}/></Route>
                <Route path="/Specifications"><SpecificationPage setSpecificationToEdit={setSpecificationToEdit}/></Route>
                <Route path="/Tests"><TestPage setTestToEdit={setTestToEdit}/></Route>

              {/* To the edit pages */}
                <Route path="/edit-tankType"><EditTankTypePage  tankTypeToEdit={tankTypeToEdit}/></Route>
                <Route path="/edit-tank"><EditTankPage  tankToEdit={tankToEdit}/></Route>
                <Route path="/edit-task"><EditTaskPage  taskToEdit={taskToEdit}/></Route>
                <Route path="/edit-lineup"><EditLineupPage  lineupToEdit={lineupToEdit}/></Route>
                <Route path="/edit-material"><EditMaterialPage  materialToEdit={materialToEdit}/></Route>
                <Route path="/edit-specification"><EditSpecificationPage  specificationToEdit={specificationToEdit}/></Route>
                <Route path="/edit-test"><EditTestPage  testToEdit={testToEdit}/></Route>

              {/* To the create pages */}
                <Route path="/create-tankType"><CreateTankTypePage /></Route>
                <Route path="/create-tank"><CreateTankPage /></Route>
                <Route path="/create-task"><CreateTaskPage /></Route>
                <Route path="/create-lineup"><CreateLineupPage /></Route>
                <Route path="/create-material"><CreateMaterialPage /></Route>
                <Route path="/create-specification"><CreateSpecificationPage /></Route>
                <Route path="/create-test"><CreateTestPage /></Route>

            </Switch>    
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;