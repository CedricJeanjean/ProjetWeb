import './App.css';
import React, { useEffect, useState } from "react";
import ListCarte from './listCarte.js';
import ComponentCard from './componentCard.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class Interface extends React.Component {

  constructor(props) {
    super(props);
    this.liste = [];
    this.listedeck = [];
    this.listename = [];
    this.tabfinal = [];
    this.deckvalider = false;
    this.textereste = "Il manque 20 cartes";
    this.buttonhidden="hidden";

    setInterval(() => {
      this.getMatch()
    },5000);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.player = urlParams.get('player');


}

  componentDidMount() {
    const url = 'http://localhost:3001/cards';

    fetch(url)
      .then(result => result.json())
      .then(result => {
        for (let i = 0; i < result.length; i++) {
          this.liste.push(result[i]);
        }
        this.setState(this.liste);
      })
  }

  handleUpdate = (liste, listedeck) => {
    if((20-this.listedeck.length)!=0){
      this.textereste="Il manque "+(20-this.listedeck.length)+" cartes";
      this.buttonhidden="hidden";
      this.setState({buttonhidden: this.buttonhidden});
    }else{
      this.textereste="";
      this.buttonhidden="";
      this.setState({buttonhidden: this.buttonhidden});
    }
    this.setState({textereste: this.textereste});
    this.setState(liste);
    this.setState(listedeck);
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
      if(!(result.status == "Deck is pending")){
        window.location.href = "http://localhost:3000/match/partie?player="+this.player;
      }
  });
}

  button(){
    if(this.listedeck.length >= 20){
      this.deckvalider = !this.deckvalider;
      this.setState({deckvalider: this.deckvalider});

      let uri = "?deck=["+this.listename+"]";
      let encodeduri = encodeURI(uri);

      fetch('http://localhost:3001/match/getMatch', {
                method: 'GET',
                headers: {
                  'www-authenticate' : sessionStorage.getItem('token'),
                  'Content-Type': 'application/json'
                },
              }).then(result => result.json())
              .then(result => {
                console.log(result);
                fetch('http://localhost:3001/match/initDeck'+uri, {
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
      });
    }

  }
 

  render(){
    if(this.deckvalider){
      return (
      <section className="container-fluid pb-5">
          <button onClick={() => {this.button()}}>Retour</button>
          <div className="row">
            <div className={"col-md-6"}>
                <div className='container-fluid containers-all-cards pb-4'>
                  <div className="row justify-content-around">
                  <div className=" text-center bg-dark rounded">
                      <h3 className="display-4 text-white">Mon deck final</h3>
                   </div>
                        <ListCarte updateState={this.handleUpdate} liste={this.listedeck} listedeck={this.liste} listename={this.listename}/>
                    </div>
                   
                </div>
              </div>
              <div className={"col-md-6"}>
              <div className='container-fluid containers-all-cards pb-4'>
                <div className="row justify-content-around">
                <div className=" text-center  bg-dark rounded">
                      <h3 className="display-4 text-white">Statut</h3>
                </div>
                <div className="m-5 bg-success bg-opacity-10 rounded">
                <div className=" text-center">
                <h6 className="display-4 text-white">En attente de votre adversaire</h6>
                </div>
                <div className="d-flex justify-content-center">
                  
                <div class="loading">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
                </div>
                </div>
                  </div>
              </div>
            </div>
          </div>
          
         
      </section>
      
    
      );
    }else{
      return (
        <section className="container-fluid pb-5">
          <button onClick={() => {this.button()}} hidden={this.buttonhidden}>Valider</button>
          <div className=" text-center">
            <h5 className=" text-white">{this.textereste}</h5>
          </div>
          
          <div className="row">
              <div className="col-md-6">
                <div className='container-fluid containers-all-cards pb-4'>
                    <div className="row justify-content-around">
                    <div className=" text-center bg-dark rounded">
                      <h3 className="display-4 text-white ">Champions disponibles</h3>
                   </div>
                      <ListCarte updateState={this.handleUpdate} liste={this.liste} listedeck={this.listedeck} listename={this.listename} state={false}/>
                    </div>
                </div>
              </div>
            <div className={"col-md-6"}>
              <div className='container-fluid containers-all-cards pb-4'>
                <div className="row justify-content-around">
                <div className=" text-center  bg-dark rounded">
                      <h3 className="display-4 text-white">Deck</h3>
                </div>
                      <ListCarte updateState={this.handleUpdate} liste={this.listedeck} listedeck={this.liste} listename={this.listename} state={true}/>
                  </div>
              </div>
            </div>
        </div>
      </section>
      );}
    }
}


export default Interface;
