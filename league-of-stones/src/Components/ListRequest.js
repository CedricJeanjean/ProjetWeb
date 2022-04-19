import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class ListRequest extends React.Component {
    render() {
        let i = 0;
        if(this.props.liste != null){
            const liste  = this.props.liste;
            return  Object.keys(liste).map((key, index) => { 
                return <div key={key} className="col-4"> {liste[key].name}  <button onClick={() => {this.props.accept(liste[key].name)}}>Click me</button> </div>
            })
        }
    }
 }

 export default ListRequest;