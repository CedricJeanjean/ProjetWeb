import React from "react";
import ComponentCard from './componentCard.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class ListCarte extends React.Component {
    render() {
        let i = 0;
        if(this.props.listedeck != null){
            const liste  = this.props.listedeck;
            return  Object.keys(liste).map((key, index) => { 
                return <div key={key} onClick={() => {
                        this.props.updateState(liste[key].name, this.props.listedeck);
                        this.props.listedeck.splice(key,1);
                }
            } className="col-2"> <ComponentCard elem={liste[key]}/> </div>
            })
        }
    }
 }

 export default ListCarte;