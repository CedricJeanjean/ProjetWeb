import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Connexion from "./Components/Connexion";
import Inscription from "./Components/Inscription";
import Suppression from "./Components/Suppression";
import Matchmaking from "./Components/Matchmaking";
import "bootstrap/dist/css/bootstrap.min.css";
import Accueil from "./Components/Accueil";
import Match from "./Components/deck/Interface";
import Partie from "./Components/match/Match";

export default function App() {
  const deconnection = async (values) => {
    fetch("http://localhost:3001/logout", {
      method: "POST",
      headers: {
        "www-authenticate": sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }).then((result) => {
      sessionStorage.removeItem("token");
      window.location.href = "http://localhost:3000/connexion";
      result.json();
    });
  };

  if (sessionStorage.getItem("token") == null) {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg  fixed-top navbar-dark bg-dark  ">
          <Link className="navbar-brand m-2 font-weight-light" to="/connexion/">
            Connexion
          </Link>
          <Link className="navbar-brand m-2 font-weight-light" to="/inscription/">
            Inscription
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/connexion/" element={<Connexion />} />
          <Route path="/inscription/" element={<Inscription />} />
          <Route path="/matchmaking/" element={<Matchmaking />} />
          <Route path="/match/" element={<Match />} />
        </Routes>
      </Router>
    );
  }
  return (
    <Router>
      <nav className="navbar navbar-expand-lg  fixed-top navbar-dark bg-dark  ">
        <Link className="navbar-brand m-2" to="/suppression/">
          Suppression
        </Link>

        <div className="btn-logout " id="logout" onClick={deconnection}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <div className="logout">Deconnexion</div>
        </div>
      </nav>

    <Routes>
      <Route path = "/" element = {<Accueil/>}/>
      <Route path = "/connexion/" element = {<Connexion/>}/>
      <Route path = "/inscription/" element = {<Inscription/>}/>
      <Route path = "/suppression/" element = {<Suppression/>}/>
      <Route path = "/matchmaking/" element = {<Matchmaking/>}/>
      <Route path = "/match/" element = {<Match/>}/>
      <Route path = "/match/partie/" element = {<Partie/>}/>
    </Routes>
  </Router>

  );
}
