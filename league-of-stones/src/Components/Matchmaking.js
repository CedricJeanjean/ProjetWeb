import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function Matchmaking(){

    const nameid = new Map();

    console.log(sessionStorage.getItem('token'))

    fetch('http://localhost:3001/matchmaking/participate', {
            method: 'GET',
            headers: {
              'www-authenticate' : sessionStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
          }).then(result => result.json())
          .then(result => {
              console.log(result);
          }
    );

    function getPlayer() {
        fetch('http://localhost:3001/matchmaking/getAll', {
            method: 'GET',
            headers: {
              'www-authenticate' : sessionStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
          }).then(result => result.json())
          .then(result => {
              for(let i = 0; i<result.length; i++){
                  console.log(result[i].name);
                  nameid.set(result[i].name, result[i].matchmakingId);
              }
          }
    );
    }

    function askForPlay(name){
        fetch('http://localhost:3001/matchmaking/request?matchmakingId='+nameid.get(name), {
            method: 'GET',
            headers: {
              'www-authenticate' : sessionStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
          }).then(result => result.json())
          .then(result => {
              console.log(result);
          }
    );
    }

    getPlayer();


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