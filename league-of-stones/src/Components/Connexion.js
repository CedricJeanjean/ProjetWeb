import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import {BrowserRouter as Router , Route, Link, Routes} from "react-router-dom";



function Connexion(){
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    const onSubmit = async values => {
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               email: values.email,
               password: values.mdp
            })
          }).then(result => {
              if(result.status == 500){
                alert("Mauvais email ou mdp")
              }
              return result.json();})
          .then(result => {
            sessionStorage.setItem('token', result.token);
            window.location.href = "http://localhost:3000/";
            console.log(result)
          })
    }

    return (

        <Styles>
            <h1>Connexion</h1>

            <Form
            onSubmit={onSubmit}
            initialValues={{ stooge: 'larry', employed: false }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit} >
                    <h3 className="formh3">Connexion</h3>
                <div>
                     
                        <Field
                        name="email"
                        component="input"
                        type="text"
                        placeholder="Email"
                        className="form-control"
                        />
                    
                </div>
                <div>
               
                    <Field
                    name="mdp"
                    component="input"
                    type="password"
                    placeholder="Mot de passe"
                    className="form-control"
                    />
                   
                </div>
                
                        
                
                <div className="buttons">
                    <button  type="submit" disabled={submitting || pristine}>
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

export default Connexion;