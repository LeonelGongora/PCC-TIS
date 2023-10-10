import axios from 'axios';
import React, {Component} from 'react';

class Add_Type_Event extends Component{

    state = {
        nombre_tipo_evento: '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveTypeEvent = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://127.0.0.1:8000/api/add-event_type', this.state);
        if(res.data.status === 200){
            console.log(res.data.message);

            this.setState({
                nombre_tipo_evento: '',

            });

        }
    }

    render(){
        return(
            
            
            <form onSubmit={this.saveTypeEvent}>
                <label htmlFor="nombre_tipo_evento">Nombre del tipo de Evento</label>
                <input type="text" name="nombre_tipo_evento" onChange = {this.handleInput} value= {this.state.nombre_tipo_evento} />
                <br />

                <br />
                <button type="submit"> Registrar nuevo tipo evento</button>

            </form>
        );

    }

}

export default Add_Type_Event;