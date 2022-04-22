import React, { useEffect, useState } from "react";
import ListCarte from './listCarte.js';
import ListCarteBoard from './listCarteBoard.js';

class Match extends React.Component {

    constructor(props) {
        super(props);
        this.liste = [];
        this.listedeckadverse = [];
        this.listedeck = [];
        this.listeboard = [];
        this.listecarte = [];
        this.tabfinal = [];
        this.deckvalider = false;
        this.tour = "Loading";
        this.buttonhidden = true;
        this.click = false;
        this.cardforattack = "";
        this.pointdevie = 150;
        this.pointdevie2 = 150;
        this.player1 = "Player 1";
        this.player2 = "Player 2";

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.player = urlParams.get('player');
    }

    componentDidMount() {
        setInterval(() => {
            this.getMatch()
          },1000);
    }

    getMatch = () =>{
        fetch('http://localhost:3001/match/getMatch', {
            method: 'GET',
            headers: {
                'www-authenticate' : sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            }).then(result =>{
                if(result.status == "500"){
                    window.location.href = "http://localhost:3000/matchmaking/";
                } 
                return result.json()})
            .then(result => {
                console.log(result)
            if(this.player == "player1"){
                this.listedeck = result.player1.hand;
                this.listeboard = result.player1.board;
                this.listedeckadverse = result.player2.board;
            }else{
                this.listedeck = result.player2.hand;
                this.listedeckadverse = result.player1.board;
                this.listeboard = result.player2.board;
            }
            this.pointdevie = result.player1.hp;
            this.pointdevie2 = result.player2.hp;
            this.player1 = result.player1.name;
            this.player2 = result.player2.name;
            if(this.pointdevie < 0 || this.pointdevie2 < 0){
                this.finmatch();
            }
            this.tour = result.status;
            if((this.tour == "Turn : player 2" && this.player == "player2") || (this.tour == "Turn : player 1" && this.player == "player1")){
                    this.buttonhidden = false;
            }
            else{
                this.buttonhidden = true;
            }
            this.setState({buttonhidden: this.buttonhidden});
            this.setState({tour: this.tour});
            this.setState({listedeck: this.listedeck});
            this.setState({listedeckadverse: this.listedeckadverse});
            this.setState({listeboard: this.listeboard});
        });
    }

    finmatch = () => {
        fetch('http://localhost:3001/match/finishMatch', {
            method: 'GET',
            headers: {
              'www-authenticate' : sessionStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
          }).then(result => result.json())
          .then(result => {
            window.location.href = "http://localhost:3000/matchmaking/";
        });
    }

    handleUpdate = (name, listedeck) => {
        fetch('http://localhost:3001/match/playCard?card='+name, {
          method: 'GET',
          headers: {
            'www-authenticate' : sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
        }).then(result => result.json())
        .then(result => {
            console.log(result);
      });
        this.setState({textereste: this.textereste});
        this.setState(listedeck);
      }

    fintour = () => {
        fetch('http://localhost:3001/match/endTurn', {
          method: 'GET',
          headers: {
            'www-authenticate' : sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
        }).then(result => result.json())
        .then(result => {
            console.log(result);
      });
    }

    pickcard = () => {
        fetch('http://localhost:3001/match/pickCard', {
          method: 'GET',
          headers: {
            'www-authenticate' : sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
        }).then(result => result.json())
        .then(result => {
            console.log(result);
      });
    }

    clickboard = (name) => {
        document.body.style.cursor = "crosshair";
        this.click = true;
        this.cardforattack = name;
    }

    clickadverse = (name) => {
        if(this.click){
            document.body.style.cursor = "auto";
            fetch('http://localhost:3001/match/attack?card='+this.cardforattack+'&ennemyCard='+name, {
                method: 'GET',
                headers: {
                    'www-authenticate' : sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                }).then(result => result.json())
                .then(result => {
                    console.log(result);
            });
        }
        this.click = false;
    }

    attackAdv = () => {
        if(this.click){
            document.body.style.cursor = "auto";
            fetch('http://localhost:3001/match/attackPlayer?card='+this.cardforattack, {
                method: 'GET',
                headers: {
                    'www-authenticate' : sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                }).then(result => result.json())
                .then(result => {
                    console.log(result);
            });
        }
        this.click = false;
    }

    render(){
        
            if(this.player==="player1"){
                return (
            <div>
                
                <img src="https://combuzz.files.wordpress.com/2010/10/geek-cyprien.jpg" className="player" onClick={this.attackAdv}/>
                <p> {this.pointdevie2}</p>
                <div className="row">
                        <div className={"col-md-6"}>
                            <div className='container-fluid containers-all-cards pb-4'>
                                <div className="row justify-content-around">
                                    <ListCarte updateState={this.handleUpdate} listedeck={this.listedeck}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="https://i.redd.it/u595cks8nqhx.jpg" className="player" onClick={this.attackAdv}/>
                <p>Player 1 , Vie : {this.pointdevie}</p>
                <button onClick={this.fintour} hidden={this.buttonhidden}>Fin du tour</button>
                <p>{this.tour}</p>
                <button onClick={this.pickcard} hidden={this.buttonhidden}>Piocher une carte</button>
                <div className="container">
                    <div className="row">
                        <div className={"col-md-6"}>
                            <div className='container-fluid containers-all-cards pb-4'>
                                <div className="row justify-content-around">
                                    <ListCarteBoard updateState={this.clickadverse} liste={this.listedeckadverse}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className={"col-md-6"}>
                            <div className='container-fluid containers-all-cards pb-4'>
                                <div className="row justify-content-around">
                                    <ListCarteBoard updateState={this.clickboard} liste={this.listeboard}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                );
            }else{
                return(
                    <div>
                    <img src="https://i.redd.it/u595cks8nqhx.jpg" className="player" onClick={this.attackAdv}/>
                    <p>{this.player1}, Vie : {this.pointdevie}</p>
                    <button onClick={this.fintour} hidden={this.buttonhidden}>Fin du tour</button>
                    <p>{this.tour}</p>
                    <button onClick={this.pickcard} hidden={this.buttonhidden}>Piocher une carte</button>
                    <div className="container">
                        <div className="row">
                            <div className={"col-md-6"}>
                                <div className='container-fluid containers-all-cards pb-4'>
                                    <div className="row justify-content-around">
                                        <ListCarteBoard updateState={this.clickadverse} liste={this.listedeckadverse}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className={"col-md-6"}>
                                <div className='container-fluid containers-all-cards pb-4'>
                                    <div className="row justify-content-around">
                                        <ListCarteBoard updateState={this.clickboard} liste={this.listeboard}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="https://combuzz.files.wordpress.com/2010/10/geek-cyprien.jpg" className="player" onClick={this.attackAdv}/>
                    <p>{this.player2}, {this.pointdevie2}</p>
                    <div className="row">
                            <div className={"col-md-6"}>
                                <div className='container-fluid containers-all-cards pb-4'>
                                    <div className="row justify-content-around">
                                        <ListCarte updateState={this.handleUpdate} listedeck={this.listedeck}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                );
            }
        
    }
}

export default Match;