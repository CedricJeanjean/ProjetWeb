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

    const deconnection = async values => {
        fetch('http://localhost:3001/logout', {
            method: 'POST',
            headers: {
                'www-authenticate' : sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
          }).then(result => result.json())
          .then(result => {
            console.log(result)
          })
    }

    const deleteAccount = async values => {

        //Il faut un formulaire pour mdp et email
        fetch('http://localhost:3001/users/amIConnected', {
            method: 'GET',
            headers: {
              'www-authenticate' : sessionStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
          }).then(result => result.json())
          .then(result => {
              console.log(result);
            fetch('http://localhost:3001/users/unsubscribe?email='+result.connectedUser.email+'&password=cedric', {
                method: 'GET',
                headers: {
                    'www-authenticate' : sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                }).then(result => result.json())
                .then(result => {
                    console.log(result)
            })
          })
    }

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