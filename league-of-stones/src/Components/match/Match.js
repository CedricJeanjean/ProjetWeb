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
        this.carteWaiting = [];
        this.carteTired = [];
        this.deckvalider = false;
        this.tour = "Loading";
        this.buttonhidden = true;
        this.click = false;
        this.cardforattack = "";
        this.pointdevie = 150;
        this.pointdevie2 = 150;
        this.player1 = "Player 1";
        this.player2 = "Player 2";
        this.first = true;

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.player = urlParams.get('player');
    }

    componentDidMount() {
        if(this.first){
            this.first = false;
            setInterval(() => {
                this.getMatch()
            },2000);
        }
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

                for(let i = 0; i < this.listeboard.length; i++){
                    for(let j = 0; j < this.carteWaiting.length; j++){
                        if(this.carteWaiting[j] == this.listeboard[i].name){
                            this.listeboard[i].name += " (Sleeping)" 
                        }
                    }

                    for(let j = 0; j < this.carteTired.length; j++){
                        if(this.carteTired[j] == this.listeboard[i].name){
                            this.listeboard[i].name += " (Tired)" 
                        }
                    }
                }

                this.pointdevie = result.player1.hp;
                this.pointdevie2 = result.player2.hp;
                this.player1 = result.player1.name;
                this.player2 = result.player2.name;
                if(this.pointdevie <= 0 || this.pointdevie2 <= 0){
                    this.finmatch();
                }

                if(result.player1.turn){
                    this.tour = result.player1.name;
                }else{
                    this.tour = result.player2.name;
                }

                if((result.player2.turn && this.player == "player2") || (result.player1.turn && this.player == "player1")){
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
        if((this.player==="player1" && this.tour != this.player1) || (this.player==="player2" && this.tour != this.player2)){
            alert("Pas votre tour")
        }
        else{
            fetch('http://localhost:3001/match/playCard?card='+name, {
                method: 'GET',
                headers: {
                    'www-authenticate' : sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                }).then(result => {
                    if(result.status == "500"){
                        alert("Trop de carte sur votre plateau")
                    }
                    return result.json()
                })
                .then(result => {
                    this.carteWaiting.push(name);
                    console.log(result);
            });
            this.setState({textereste: this.textereste});
            this.setState(listedeck);
        }
      }

    fintour = () => {
        if((this.player==="player1" && this.tour != this.player1) || (this.player==="player2" && this.tour != this.player2)){
            alert("Pas votre tour")
        }
        else{
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
            this.carteWaiting = [];
            this.carteTired = [];
        }
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
        if((this.player==="player1" && this.tour != this.player1) || (this.player==="player2" && this.tour != this.player2)){
            alert("Pas votre tour")
        }
        else{
            let attack=true;
            for(var i= 0; i < this.carteWaiting.length; i++){
                if(this.carteWaiting[i]+" (Sleeping)" === name){
                    attack = false;
                }
            }

            for(var i= 0; i < this.carteTired.length; i++){
                if(this.carteTired[i]+" (Tired)" === name){
                    attack = false;
                }
            }

            if(attack){
                document.body.style.cursor = "crosshair";
                this.click = true;
                this.cardforattack = name;
            }
        }
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
                    this.carteTired.push(this.cardforattack);
            });
        }
        this.click = false;
    }

    attackAdv = () => {
        if(this.click){
            if(this.listedeckadverse.length == 0){
                document.body.style.cursor = "auto";
                this.click = false;
                fetch('http://localhost:3001/match/attackPlayer?card='+this.cardforattack, {
                    method: 'GET',
                    headers: {
                        'www-authenticate' : sessionStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    }).then(result => result.json())
                    .then(result => {
                        console.log(result);
                        this.carteTired.push(this.cardforattack);
                });
            }else{
                alert("Vous devez d\'abord attaquer les cartes de l\'adversaire")
            }
        }
    }

    render(){
        
            if(this.player==="player1"){
                return (
                <div>
                    <br></br>
                    <h3 className="display-4" id="tour">Tour de {this.tour}</h3>
                    <img src="https://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/4568.png" className="player" onClick={this.attackAdv}/>
                    <p id="name">{this.player2}, Vie : {this.pointdevie2}</p>
                        
                                <div className='container-fluid'>
                                    <div className="d-flex row justify-content-center">
                                        <ListCarteBoard updateState={this.clickadverse} liste={this.listedeckadverse}/>
                                    </div>
                            
                            </div>
                    
                        <hr style={{height: '2px', color:'black'}}/>
                        <div className="row">
                            <div className={"col"}>
                                <div className='container-fluid'>
                                    <div className="d-flex justify-content-center">
                                        <ListCarteBoard updateState={this.clickboard} liste={this.listeboard}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src="https://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/3849.png" className="player" onClick={this.attackAdv}/>
                    <p id="name">{this.player1}, Vie : {this.pointdevie}</p>
                    <button onClick={this.fintour} hidden={this.buttonhidden}>Fin du tour</button>
                    <button onClick={this.pickcard} hidden={this.buttonhidden}>Piocher une carte</button>
                    <div className=" text-center  rounded">
                     <h3 className="display-4  text-white">Mon deck</h3>
                    </div>
                        <div className="row ">
                            <div className={"col"}>
                                <div className='container-fluid'>
                                    <div className="d-flex justify-content-center">
                                        <ListCarte updateState={this.handleUpdate} listedeck={this.listedeck}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
            </div>
                );
            }else{
                return(
                    <div>
                    <br></br>
                    
                    <p id="tour">Tour de {this.tour}</p>
                    <img src="https://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/3849.png" className="player" onClick={this.attackAdv}/>
                    <p id="name">{this.player1}, Vie : {this.pointdevie}</p>
                        <div className="row">
                            <div className={"col"}>
                                <div className='container-fluid'>
                                    <div className="d-flex row justify-content-center">
                                        <ListCarteBoard updateState={this.clickadverse} liste={this.listedeckadverse}/>
                                    </div>
                                </div>
                            </div>
                        <hr style={{height: '2px', color:'black'}} />
                        <div className="row">
                            <div className={"col"}>
                                <div className='container-fluid'>
                                    <div className="d-flex justify-content-center">
                                        <ListCarteBoard updateState={this.clickboard} liste={this.listeboard}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="https://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/4568.png" className="player" onClick={this.attackAdv}/>
                    <p id="name">{this.player2}, Vie : {this.pointdevie2}</p>
                    <button onClick={this.fintour} hidden={this.buttonhidden}>Fin du tour</button>
                    <button onClick={this.pickcard} hidden={this.buttonhidden}>Piocher une carte</button>
                    <div className="row">
                            <div className={"col"}>
                                <div className='container-fluid'>
                                    <div className="d-flex justify-content-center">
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