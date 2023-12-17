import React, {Component} from 'react';
import NavbarUser from '../components/NavBars/NavbarUser';
import "../stylesheets/HomepageStyles.css";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import configApi from '../configApi/configApi'
import {URL_API} from '../const';

const cookies = new Cookies();
const Eventos_Api_Url = configApi.EVENTOC_API_URL;

class Homepage extends Component{

    noticias = []

    constructor(props) {
        super(props);
        this.state = {
          events: [],
          loader: false,
          url: `${URL_API}/eventoabiertos`,
        };
    }

    getNotices = async () => {
        const url = `${URL_API}/get-notices`; 
        const respuesta = await axios.get(url);
        console.log(respuesta)
        this.noticias = Array.from(respuesta.data.anuncios);
        this.setState({ loader: false });
        //setOrganizadores(respuesta.data.organizadores);
    }

    redirigir = async () => {
        window.location.href='./home-participant';
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
                    <div className='contenedorSecundario'>
                    <div className='informacion'>
                        
                        <div className='titleEvent-date'>
                        <button className='buttonVer' onClick={this.redirigir}> Ver todos los eventos </button>
                        </div>
                    </div>
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