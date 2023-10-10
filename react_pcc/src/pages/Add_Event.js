import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Add_Event extends Component{

    state = {
        nombre_evento: '',
        requisitos: '',
        fecha_inicio: '',
        numero_contacto: '',
        descripcion: '',
        fecha_limite: '',
        fecha_fin: '',
        participantes_equipo: '',
        event_type_id: '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveEvent = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://127.0.0.1:8000/api/add-event', this.state);

        if(res.data.status === 200){
            console.log(res.data.message);
            this.setState({
                nombre_evento: '',
                requisitos: '',
                fecha_inicio: '',
                numero_contacto: '',
                descripcion: '',
                fecha_limite: '',
                fecha_fin: '',
                participantes_equipo: '',
                event_type_id: '',

            });
        }
    }

    render(){
        return(

            <><form onSubmit={this.saveEvent}>

                <label htmlFor="nombre_evento">Nombre</label>
                <input type="text" name="nombre_evento" placeholder="Ingrese nombre" onChange={this.handleInput} value={this.state.nombre_evento} />
                <br />

                <label htmlFor="requisitos">Requisitos</label>
                <input type="text" name="requisitos" placeholder="requisitos" onChange={this.handleInput} value={this.state.requisitos} />
                <br />

                <label htmlFor="fecha_inicio">Fecha inicio</label>
                <input type="date" name="fecha_inicio" placeholder="Ingrese fecha" onChange={this.handleInput} value={this.state.fecha_inicio} />
                <br />

                <label htmlFor="numero_contacto">Numero de Contacto</label>
                <input type="number" name="numero_contacto" placeholder="65487898" onChange={this.handleInput} value={this.state.numero_contacto} />
                <br />

                <label htmlFor="descripcion">Descripcion</label>
                <input type="text" name="descripcion" placeholder="Descripcion" onChange={this.handleInput} value={this.state.descripcion} />
                <br />

                <label htmlFor="fecha_limite">Fecha Limite</label>
                <input type="date" name="fecha_limite" onChange={this.handleInput} value={this.state.fecha_limite} />
                <br />

                <label htmlFor="fecha_fin">Fecha Fin</label>
                <input type="date" name="fecha_fin" onChange={this.handleInput} value={this.state.fecha_fin} />
                <br />

                <label htmlFor="participantes_equipo">Numero de Participantes</label>
                <input type="number" name="participantes_equipo" onChange={this.handleInput} value={this.state.participantes_equipo} />
                <br />

                <label htmlFor="event_type_id">Tipo de Evento</label>
                <input type="number" name="event_type_id" onChange={this.handleInput} value={this.state.event_type_id} />
                <br />

                <br />

                <button type="submit"> Registrar evento</button>

            </form>
            <Link to={'add-type-event'}> Añadir Evento</Link></>

        );
    }
}





export default Add_Event;
