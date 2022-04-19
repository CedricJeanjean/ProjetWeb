import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function Matchmaking(){

    console.log(sessionStorage.getItem('token'))
    
    return (
       
        <div>
            <button>ANNULER</button>
            <li>
                <ul>oe<button>MATCH</button></ul>
                <ul>oe2<button>MATCH</button></ul>
            </li>

            <li>
                <ol>zina wants to fight! <button>decline</button><button>accept</button></ol>
            </li>
        </div>
        
        
    )
}

export default Matchmaking;