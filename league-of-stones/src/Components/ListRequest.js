import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class ListRequest extends React.Component {
    render() {
        let i = 0;
        if(this.props.liste != null){
            const liste  = this.props.liste;
            return  Object.keys(liste).map((key, index) => { 
                return  <div className="col-2 m-3  d-flex justify-content-center align-items-center">
                        
                    <div class="carte" onClick={() => {this.props.accept(liste[key].name)}}>Play with {liste[key].name}</div> 
                    </div>
                
                 
            })
        }
    }
 }

 export default ListRequest;