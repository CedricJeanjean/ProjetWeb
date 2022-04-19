import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Field } from 'react-final-form'
import Styles from './Styles'




function Suppression(){
    
        

    return (

        <Styles>
            <h1>Suppression du compte</h1>

            <Form

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
export default Suppression;


 

