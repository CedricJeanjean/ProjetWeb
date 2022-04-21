import React, { useEffect, useState } from "react";
import ListCarte from '../deck/listCarte.js';

class Match extends React.Component {

    constructor(props) {
        super(props);
        this.liste = [];
        this.listedeck = [];
        this.listecarte = [];
        this.tabfinal = [];
        this.deckvalider = false;

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
          }else{
              this.listedeck = result.player2.hand;
          }
          console.log(result);
          this.setState({listedeck: this.listedeck});
      });
    }

    render(){
        return (
            <div>
                <img src="https://i.redd.it/u595cks8nqhx.jpg" className="player"/>
                <p>Player 1</p>
                <div className="container">
                    <div className="row">
                        <div className={"col-md-6"}>
                            <div className='container-fluid containers-all-cards pb-4'>
                                <div className="row justify-content-around">
                                    <ListCarte updateState={this.handleUpdate} liste={this.listedeck} listedeck={this.liste}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row justify-content-around">
                    <div className="col-4">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_0.jpg"/>
                        <div className="name">Teemo</div>
                    </div>
                    <div className="col-4">
                        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Taric_0.jpg"/>
                        <div className="name">Taric</div>
                    </div>
                    </div>
                </div>
                <img src="https://combuzz.files.wordpress.com/2010/10/geek-cyprien.jpg" className="player"/>
                <p>Player 2</p>
            </div>
        )
    }
}

export default Match;