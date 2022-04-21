import React from "react";

class ComponentCard extends React.Component {
    render() {
        this.url = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+this.props.elem.key+"_0.jpg";
        return (    
            <section> 
                <div className="nom">
                    {this.props.elem.name}
                </div>
                <div className="champ">
                    <img className="imagelogo" src={this.url}></img>
                    <div className="texte">
                        Attack : {this.props.elem.info.attack}<br/>
                        Defense : {this.props.elem.info.defense}<br/>
                        Magic : {this.props.elem.info.magic}<br />
                        Difficulty : {this.props.elem.info.difficulty}
                    </div>
                </div>
            </section>
        );
    }
 }

 export default ComponentCard;