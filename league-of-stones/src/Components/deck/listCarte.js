import React from "react";
import ComponentCard from './componentCard.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class ListCarte extends React.Component {
    render() {
        let i = 0;
        if(this.props.liste != null){
            const liste  = this.props.liste;
            return  Object.keys(liste).map((key, index) => { 
                return <div key={key} onClick={() => {
                    if(this.props.listedeck.length < 20 || this.props.state){
                        this.props.listedeck.push(liste[key]);
                        this.props.listename.push("{\"key\": \""+liste[key].name+"\"}");
                        this.props.liste.splice(key,1);
                        this.props.updateState(this.props.liste, this.props.listedeck)
                    }
                }
            } className="col m-15 cardReact"> <ComponentCard elem={liste[key]}/> </div>
            })
        }
    }
 }

 export default ListCarte;