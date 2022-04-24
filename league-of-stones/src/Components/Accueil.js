
import './Accueil.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js';

function Accueil(){

    if(sessionStorage.getItem('token') == null){
        window.location.href = "http://localhost:3000/connexion/";
    }
    const onclickfct  = fct => {
        window.location.href = "http://localhost:3000/matchmaking/";
    }

    return (
            
        <body>
        <div  className="body">

            <div className="center">
                <div className="water" onClick={onclickfct}>
                    <button className="btn-match" >Match</button>
                </div>

                
           </div>
      
        </div>
        </body>
    
    
    )
}

export default Accueil;