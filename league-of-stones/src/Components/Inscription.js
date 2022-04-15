import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Form, Field } from 'react-final-form'
import Styles from './Styles'




function Inscription(){
    const onSubmit = async values => {
        
        fetch('http://localhost:3001/user', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               email: values.email,
               name: values.pseudo,
               password: values.mdp
            })
          }).then(result => result.json())
          .then(result => {
            console.log(result)
          })
    }
    return (

        <Styles>
            <h1>Inscription</h1>

            <Form
            onSubmit={onSubmit}
            initialValues={{ stooge: 'larry', employed: false }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                <div>
                    <label>Pseudo</label>
                    <Field
                    name="pseudo"
                    component="input"
                    type="text"
                    placeholder="Pseudo"
                    />
                </div>
                                
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
export default Inscription;


 

