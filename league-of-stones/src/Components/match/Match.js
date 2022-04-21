import React, { useEffect, useState } from "react";
import ListCarte from './listCarte.js';
import ListCarteBoard from '../deck/listCarte.js';

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

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.player = urlParams.get('player');
    }

    componentDidMount() {
        setInterval(() => {
            this.getMatch()
          },5000);
    }

    getMatch = () =>{
        fetch('http://localhost:3001/match/getMatch', {
          method: 'GET',
          headers: {
            'www-authenticate' : sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
        }).then(result => result.json())
        .then(result => {
          if(this.player == "player1"){
              this.listedeck = result.player1.hand;
              this.listeboard = result.player1.board;
              this.listedeckadverse = result.player2.board;
          }else{
              this.listedeck = result.player2.hand;
              this.listedeckadverse = result.player1.board;
              this.listeboard = result.player2.board;
          }
          this.tour = result.status;
          this.setState({tour: this.tour});
          this.setState({listedeck: this.listedeck});
          this.setState({listedeckadverse: this.listedeckadverse});
          this.setState({listeboard: this.listeboard});
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

    render(){
        return (
            <div>
                <img src="https://i.redd.it/u595cks8nqhx.jpg" className="player"/>
                <p>Player 1</p>
                <button onClick={this.fintour}>Fin du tour</button>
                <p>{this.tour}</p>
                <div className="container">
                    <div className="row">
                        <div className={"col-md-6"}>
                            <div className='container-fluid containers-all-cards pb-4'>
                                <div className="row justify-content-around">
                                    <ListCarteBoard updateState={this.handleUpdate} liste={this.listedeckadverse} listedeck={this.liste}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className={"col-md-6"}>
                            <div className='container-fluid containers-all-cards pb-4'>
                                <div className="row justify-content-around">
                                    <ListCarteBoard updateState={this.handleUpdate} liste={this.listeboard} listedeck={this.liste}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="https://combuzz.files.wordpress.com/2010/10/geek-cyprien.jpg" className="player"/>
                <p>Player 2</p>
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
        )
    }
}

export default Match;