import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Styles from './Styles'
import { Form, Field } from 'react-final-form'



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
          }).then(result => result.json())
          .then(result => {
            sessionStorage.setItem('token', result.token);
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

export default Connexion;