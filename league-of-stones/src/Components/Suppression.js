import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import {BrowserRouter as Router , Route, Link, Routes} from "react-router-dom";



function Suppression(){
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

    const onSubmit = async values => {
        fetch('http://localhost:3001/users/amIConnected', {
            method: 'GET',
            headers: {
              'www-authenticate' : sessionStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
          }).then(result => result.json())
          .then(result => {
            if(result!=null){
                fetch('http://localhost:3001/users/unsubscribe?email='+values.email+'&password='+values.mdp, {
                    method: 'GET',
                    headers: {
                        'www-authenticate' : sessionStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    }).then(result => {
                        if(result.status == 500){
                            alert("Compte introuvable");
                        }else{
                        alert("Compte supprimé");
                        sessionStorage.removeItem("token");
                        window.location.href = "http://localhost:3000/connexion";
                        }
                        return result.json();
                    })
                    .then(result => {
                        console.log("Ok");
                })
            }
            else{
                console.log("not connected");
            }
          })
    }

    return (

        <Styles>
            <h1>Suppression de compte</h1>

            <Form
            onSubmit={onSubmit}
            initialValues={{ stooge: 'larry', employed: false }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                <div>
                    <Field
                    name="email"
                    component="input"
                    type="text"
                    placeholder="Email"
                    />
                </div>
                <div>
                    <Field
                    name="mdp"
                    component="input"
                    type="password"
                    placeholder="Mot de passe"
                    />
                </div>
                
                <div className="buttons">
                    <button type="submit" disabled={submitting || pristine}>
                    Submit
                    </button>
                    <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                    >
                    Reset
                    </button>
                </div>
                </form>
            )}
            />
        </Styles>
        )
      
    
}

export default Suppression;