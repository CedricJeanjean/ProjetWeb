import '../App.css';
import './Accueil.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router , Route, Link, Routes} from "react-router-dom";
import Connexion from "./Connexion";
import Inscription from "./Inscription";
import { useState } from 'react';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js';


function Accueil(){

    if(sessionStorage.getItem('token') == null){
        window.location.href = "http://localhost:3000/connexion/";
    }

    const deconnection = async values => {
        fetch('http://localhost:3001/logout', {
            method: 'POST',
            headers: {
                'www-authenticate' : sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
          }).then(result => {
            sessionStorage.removeItem('token');
            window.location.href = "http://localhost:3000/connexion/";
            result.json()})
    }

    const onclickfct  = fct => {
        window.location.href = "http://localhost:3000/matchmaking/";
    }

    return (
       
        <div className="body">
            
            <div className="btn-logout " id="logout"  onClick={deconnection}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <div className="logout">Deconnexion</div>
            </div>
            <div className="center">
                <button className="btn-match red" onClick={onclickfct}>Match</button>
            </div>
      
        </div>
        
    
    
    )
}

export default Accueil;