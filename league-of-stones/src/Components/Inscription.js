import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Form, Field } from 'react-final-form'
import Styles from './Styles'




function Inscription(){
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
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
                    name="Pseudo"
                    component="input"
                    type="text"
                    placeholder="Pseudo"
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
                
                
                <div>
                <label>Confirmez mdp</label>
                    <Field
                    name="confirmmdp"
                    component="input"
                    type="text"
                    placeholder="Confirmer Mot de passe"
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


 

