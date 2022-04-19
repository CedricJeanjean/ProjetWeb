import '../App.css';
import './Accueil.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js';


function Accueil(){
    return (
       
        <div className="body">
            
            <a className="btn-logout " id="logout" href="" onClick={deconnection}>
                <i class="fa-solid fa-right-from-bracket"></i>
                <div className="logout">Deconnexion</div>
            </a>
            <div className="center">
             <button className="btn-match red">Match</button>
            </div>
            <button id="deleteAccount" onClick={deleteAccount}> Supprimer compte</button>
      
        </div>
        
    )
}

export default Accueil;