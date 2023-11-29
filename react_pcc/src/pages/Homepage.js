import React, {Component} from 'react';
import NavbarUser from '../components/NavBars/NavbarUser';
import "../stylesheets/HomepageStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import configApi from '../configApi/configApi'

const cookies = new Cookies();
const Eventos_Api_Url = configApi.EVENTOC_API_URL;

class Homepage extends Component{

    noticias = []

    constructor(props) {
        super(props);
        this.state = {
          events: [],
          loader: false,
          url: "http://127.0.0.1:8000/api/eventoabiertos",
        };
    }

    getNotices = async () => {
        const url = "http://127.0.0.1:8000/api/get-notices"; 
        const respuesta = await axios.get(url);
        console.log(respuesta)
        this.noticias = Array.from(respuesta.data.anuncios);
        this.setState({ loader: false });
        //setOrganizadores(respuesta.data.organizadores);
    }
    
    componentDidMount(){
        this.getNotices();
    }

    render(){

        return (
          <div className="App">
            <div className="background-home"></div> {/* Componente de fondo */}
            <div className="content">
            <NavbarUser />
              <div className='contenedorHome'>
                <div className='presentacion'>
                    <div className='title-description'>
                        <h3 className='title'>Programming Competition Community</h3>
                        <p className='description'>PCC es un sistema que permite ayudar a las fases 
                        administrativas de los eventos de competencias de programación en la UMSS</p>
                    </div>
                    <img className="logo" src={require("../images/logo512.png")}
                    alt="Logo del sistema"/>
                </div>
                <div className='contenedorInformacion'>
                    <div className='contanedorSecuandario'>
                    <div className='informacion'>
                        <img className="afiche" src={require("../images/afiche.png")}
                        alt="Logo del sistema"/>
                        <div className='titleEvent-date'>
                            <h4 className='titleEvent'>Competencia Internacional de Programacion Universitaria</h4>
                            <p className='date'>
                            <FontAwesomeIcon icon={faCalendar} />  Fecha de Inscripcion</p>
                            <p className='dateEvent'>25/12/2023</p>
                        <button className='buttonInf'> Más información del evento </button>
                        </div>
                    </div>
                    <button className='buttonVer'> Ver todos los eventos </button>
                    </div>
                    <div className="ContenedorNoticias">
                        <div className="EncabezadoNoticias">
                            <h1 className='tituloNoticias'>Noticias</h1>
                        </div>
                        <div className="ContenedorAnuncios">
                        {this.noticias.map((noticia, index) => {
                        return (
                            <>
                            <div className='anuncio'>
                                <h1 className='tituloNoticias'>Noticia  {index + 1}</h1>
                                <p className='text'>{noticia.contenido_anuncio} </p>
                            </div>
                            </>
                         );
                        })}
                       </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Homepage;