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

        setInterval(this.participate(),5000);
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
              console.log(result);
          }
    );
    }

    render(){
        return (
            <div>
                <ListPlayers liste={this.playerslist} setAdv={this.askForPlay}/>

                Pending request : 

                <ListRequest liste={this.request} accept={this.acceptRequest}/>
            </div>
        )
    }
}

export default Matchmaking;