import React from "react";
import ComponentCard from './componentCard.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class ListCarteBoard extends React.Component {
    render() {
        let i = 0;
        if(this.props.liste != null){
            const liste  = this.props.liste;
            return  Object.keys(liste).map((key, index) => { 
                return <div key={key} onClick={() => {
                    this.props.updateState(liste[key].name)
                }
            } className="col-4"> <ComponentCard elem={liste[key]}/> </div>
            })
        }
    }
 }

 export default ListCarteBoard;