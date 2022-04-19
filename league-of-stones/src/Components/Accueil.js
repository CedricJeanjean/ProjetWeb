import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router , Route, Link, Routes} from "react-router-dom";
import Connexion from "./Connexion";
import Inscription from "./Inscription";
import { useState } from 'react';


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
       
        <div>
            <button id="logout" onClick={deconnection}>Deconnection</button>
            <button id="deleteAccount" onClick={deleteAccount}>Supprimer compte</button>
            <button id="matchmaking">Lancer le match</button>
        
   </div>
    )
}

export default Accueil;