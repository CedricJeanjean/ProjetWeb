import React from "react";
import {BrowserRouter as Router , Route, Link, Routes} from "react-router-dom";
import Accueil from "./Components/Accueil";
import Connexion from "./Components/Connexion";
import Inscription from "./Components/Inscription";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
       <nav className="navbar navbar-expand-lg  navbar-dark bg-dark  ">
       <Link className="navbar-brand m-2" to="/">Accueil</Link>
       <Link className="navbar-brand m-2" to="/connexion/">Connexion</Link>
       <Link className="navbar-brand m-2" to="/inscription/">Inscription</Link>
      
    </nav>
   

    <Routes>
      <Route path = "/" exact element = {<Accueil/>}/>
      <Route path = "/connexion/" element = {<Connexion/>}/>
      <Route path = "/inscription/" element = {<Inscription/>}/>
    </Routes>
  </Router>
  );
}
