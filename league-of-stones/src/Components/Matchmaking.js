import '../App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListPlayers from './ListPlayers.js';
import ListRequest from './ListRequest.js';

class Matchmaking extends React.Component {

    constructor(props) {
        super(props);
        this.nameid = new Map();
        this.playerslist = [];
        this.request = [];

        setInterval(() => {
            this.participate();
            this.componentDidMount();
          }, 2000);
    }
    componentDidMount() {
        fetch('http://localhost:3001/matchmaking/getAll', {
            method: 'GET',
            headers: {
            'www-authenticate' : sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
            },
        }).then(result => result.json())
        .then(result => {
            for(let i = 0; i < result.length; i++){
                this.nameid.set(result[i].name, result[i].matchmakingId);
            }
            this.playerslist = result;
            this.setState(this.playerslist);
        }
    );
    }

    participate = () => {
        fetch('http://localhost:3001/matchmaking/participate', {
            method: 'GET',
            headers: {
            'www-authenticate' : sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
            },
            }).then(result => result.json())
            .then(result => {
                if(result.match!=null){
                    window.location.href = "http://localhost:3000/match?player=player1";
                }
                this.request = result.request;
                this.setState(this.request);
            }
        );
    }

    askForPlay = (name) => {
        fetch('http://localhost:3001/matchmaking/request?matchmakingId='+this.nameid.get(name), {
            method: 'GET',
            headers: {
              'www-authenticate' : sessionStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
          }).then(result => result.json())
          .then(result => {
              console.log(result);
              document.location.reload(true);
          }
    );
    }

    acceptRequest = (name) => {
        fetch('http://localhost:3001/matchmaking/acceptRequest?matchmakingId='+this.nameid.get(name), {
            method: 'GET',
            headers: {
              'www-authenticate' : sessionStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
          }).then(result => result.json())
          .then(result => {

              window.location.href = "http://localhost:3000/match?player=player2";
          }
    );
    }


    render(){
        if(sessionStorage.getItem('token') == null){
            window.location.href = "http://localhost:3000/connexion/";
        }
        return (
            <div>

                <div className="container-fluid">
                <br></br> <br></br><br></br><br></br><br></br>
                <div className="m-5">
                <div className=" text-center">
                     <h3 className="display-4">Sélectionnez votre adversaire</h3>
                </div>
                </div>
            
                    <div className="d-flex row justify-content-center">
                    
                        <ListPlayers liste={this.playerslist} setAdv={this.askForPlay}/>
                    </div>
                </div>
                <br></br> <br></br><br></br><br></br><br></br>

                <div className=" text-center">
                     <h3 className="display-4">Les joueurs qui veulent vous défier</h3>
                </div>

                <div className="d-flex row justify-content-center">

                <ListRequest liste={this.request} accept={this.acceptRequest}/>
                </div>
            </div>
        )
    }
}

export default Matchmaking;