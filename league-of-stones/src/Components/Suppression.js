import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import {BrowserRouter as Router , Route, Link, Routes} from "react-router-dom";



function Suppression(){

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
                            console.log("Error")
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
                    <label>Email</label>
                    <Field
                    name="email"
                    component="input"
                    type="text"
                    placeholder="Email"
                    />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <Field
                    name="mdp"
                    component="input"
                    type="text"
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