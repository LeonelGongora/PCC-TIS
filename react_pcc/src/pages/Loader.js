import React, {Component} from "react";

class Loader extends Component{

    render(){
        return(
            <div className="ui activate inverted dimmer">
                <div className="ui loader"></div>

            </div>

        );
    }
}

export default Loader;