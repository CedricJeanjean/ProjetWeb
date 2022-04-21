import React from "react";

class ComponentCard extends React.Component {
    render() {
        this.url = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+this.props.elem.key+"_0.jpg";
        return (    
            <section> 
               
                <div className="card-before card border-1 bg-black hover-overlay hover-zoom " style={{width: '15rem', height:'25rem', fontFamily:'sans-serif'}}>
                    <img className="imagelogo card-img-top" src={this.url}></img>
                    <div className="bg-dark text-secondary panel-footer text-center texte" style={{ fontFamily:'sans-serif'}}>
                        <p className="bg-black text-white" > {this.props.elem.name}</p>
                        <span className="text-white">Attack : {this.props.elem.info.attack}</span><br/><br/>
                        <span className="text-white">Defense : {this.props.elem.info.defense}</span><br/><br/>
                        <span className="text-white">Magic : {this.props.elem.info.magic}</span><br/><br/>
                        <span className="text-white">Difficulty : {this.props.elem.info.difficulty}</span>
                    </div>
                </div>
            </section>
        );
    }
 }

 export default ComponentCard;