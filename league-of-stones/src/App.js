import React from "react";
import {BrowserRouter as Router , Route, Link, Routes} from "react-router-dom";
import Connexion from "./Components/Connexion";
import Inscription from "./Components/Inscription";
import Suppression from "./Components/Suppression";
import Matchmaking from "./Components/Matchmaking";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accueil from "./Components/Accueil";
import Match from "./Components/deck/Interface";

export default function App() {
  return (
    <Router>
       <nav className="navbar navbar-expand-lg  fixed-top navbar-dark bg-dark  ">
       <Link className="navbar-brand m-2" to="/connexion/">Connexion</Link>
       <Link className="navbar-brand m-2" to="/inscription/">Inscription</Link>
       <Link className="navbar-brand m-2" to="/suppression/">Suppression</Link>
    </nav>
   

    <Routes>
      <Route path = "/" element = {<Accueil/>}/>
      <Route path = "/connexion/" element = {<Connexion/>}/>
      <Route path = "/inscription/" element = {<Inscription/>}/>
      <Route path = "/suppression/" element = {<Suppression/>}/>
      <Route path = "/matchmaking/" element = {<Matchmaking/>}/>
      <Route path = "/match/" element = {<Match/>}/>
    </Routes>
  </Router>
  );
}
