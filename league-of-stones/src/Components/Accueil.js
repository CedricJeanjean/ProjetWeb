import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


function Accueil(){
    return (
       
        <div>
            <button id="logout">Deconnection</button>
            <button id="deleteAccount">Supprimer compte</button>
        </div>
        
    )
}

export default Accueil;