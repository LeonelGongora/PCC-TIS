import { useState, useEffect } from "react";
import axios from 'axios';
import "../stylesheets/TipoDeUsuarioStyles.css";
import NavbarAdmin from '../components/NavBars/NavbarAdmin';
import Cookies from 'universal-cookie';
import { URL_API } from '../const';
import ModalWindow from '../components/ModalWindows/ModalWindow';
import ModalWindowOrganizadores from '../components/ModalWindows/ModalWindowOrganizadores';
import ModalWindowPatrocinadores from '../components/ModalWindows/ModalWindowPatrocinadores';
import ModalAnuncio from '../components/ModalWindows/ModalAnuncio';

const cookies = new Cookies();

function FormRegistroTipoUser() {

  const [formData, setFormData] = useState({
    cargo: '',
  })

  const [errors, setErrors] = useState({})
  const [privilegio, setPrivilegio] = useState('')

  const [registerevent, setRegisterevent] = useState(0);
  const [editevent, setEditevent] = useState(0);
  const [registertypeevent, setRegistertypeevent] = useState(0);
  const [viewevent, setViewevent] = useState(0);
  const [viewparticipantevent, setViewparticipantevent] = useState(0);
  const [registeractivity, setRegisteractivity] = useState(0);
  const [deleteactivity, setDeleteactivity] = useState(0);
  const [configureform, setConfigureform] = useState(0);
  const [registerorganizer, setRegisterorganizer] = useState(0);
  const [registersponsor, setRegistersponsor] = useState(0);
  const [administerrequest, setAdministerrequest] = useState(0);
  const [registerad, setRegisterad] = useState(0);
  const [generalreport, setGeneralreport] = useState(0);
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [estadoModalOrganizador, cambiarEstadoModalOrganizador] = useState(false);
  const [estadoModalPatrocinador, cambiarEstadoModalPatrocinador] = useState(false);
  const [estadoModalAnuncio, cambiarEstadoModalAnuncio] = useState(false);

  // useEffect(()=>{
  //   console.log(formData.cargo)
  // }, [formData.cargo]);

  // useEffect(() => {
  //   console.log(privilegio)
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
  }

  const saveTipo = async (e) => {
    e.preventDefault();

    const url = `${URL_API}/tipos`;
    axios.post(url, {
      cargo: formData.cargo,
      privilegio: privilegio
    }).then(response=>{
      console.log("exito")
      // window.location.href = './login';
    })
  }

  useEffect(() => {
    setPrivilegio(`${registerevent},${editevent},${registertypeevent},${viewevent},${viewparticipantevent},${registeractivity},${deleteactivity},${configureform},${registerorganizer},${registersponsor},${administerrequest},${registerad},${generalreport}`)
  }, [registerevent, editevent, registertypeevent, viewevent, viewparticipantevent, registeractivity, deleteactivity, configureform, registerorganizer, registersponsor, administerrequest, registerad, generalreport]);

  const changeRegisterevent =(e) =>{
    if (registerevent==1) setRegisterevent(0)
    else setRegisterevent(1)
  };

  const changeEditevent =(e) =>{
    if (editevent==1) setEditevent(0)
    else setEditevent(1)
  };

  const changeRegistertypeevent =(e) =>{
    if (registertypeevent==1) setRegistertypeevent(0)
    else setRegistertypeevent(1)
  };

  const changeViewevent =(e) =>{
    if (viewevent==1) setViewevent(0)
    else setViewevent(1)
  };

  const changeViewparticipantevent =(e) =>{
    if (viewparticipantevent==1) setViewparticipantevent(0)
    else setViewparticipantevent(1)
  };

  const changeRegisteractivity =(e) =>{
    if (registeractivity==1) setRegisteractivity(0)
    else setRegisteractivity(1)
  };

  const changeDeleteactivity =(e) =>{
    if (deleteactivity==1) setDeleteactivity(0)
    else setDeleteactivity(1)
  };

  const changeConfigureform =(e) =>{
    if (configureform==1) setConfigureform(0)
    else setConfigureform(1)
  };

  const changeRegisterorganizer =(e) =>{
    if (registerorganizer==1) setRegisterorganizer(0)
    else setRegisterorganizer(1)
  };

  const changeRegistersponsor =(e) =>{
    if (registersponsor==1) setRegistersponsor(0)
    else setRegistersponsor(1)
  };

  const changeAdministerrequest =(e) =>{
    if (administerrequest==1) setAdministerrequest(0)
    else setAdministerrequest(1)
  };

  const changeRegisterad =(e) =>{
    if (registerad==1) setRegisterad(0)
    else setRegisterad(1)
  };

  const changeGeneralreport =(e) =>{
    if (generalreport==1) setGeneralreport(0)
    else setGeneralreport(1)
  };
  const reiniciarPagina = () => {
    window.location.href='./FormRegistroTipoUser';
  };

  return (
    <div className="App">
      <ModalWindow
        estado1={estadoModal}
        cambiarEstado1={cambiarEstadoModal}
      />
      <ModalWindowOrganizadores
        estadoOrganizador={estadoModalOrganizador}
        cambiarEstadoModalOrganizador={cambiarEstadoModalOrganizador}
      />
      <ModalWindowPatrocinadores
        estadoPatrocinador={estadoModalPatrocinador}
        cambiarEstadoModalPatrocinador={cambiarEstadoModalPatrocinador}
      />
      <ModalAnuncio
        estadoAnuncio={estadoModalAnuncio}
        cambiarEstadoAnuncio={cambiarEstadoModalAnuncio}
      />
      <div className="background-image"></div>
      <div className="content">
        <NavbarAdmin
          estado1={estadoModal}
          cambiarEstado1={cambiarEstadoModal}
          estadoOrganizador={estadoModalOrganizador}
          cambiarEstadoOrganizador={cambiarEstadoModalOrganizador}
          estadoPatrocinador={estadoModalPatrocinador}
          cambiarEstadoPatrocinador={cambiarEstadoModalPatrocinador}
          estadoAnuncio={estadoModalAnuncio}
          cambiarEstadoAnuncio={cambiarEstadoModalAnuncio}
        />
        <div className="registroTipoUsuario">
          <div className="textoEvento-user">
            <p className="textoRegistro-user">Registro Tipo de Usuario</p>
          </div>
          
          <div className="entradaDatos-user">
            <form onSubmit={saveTipo}>
                <div id="entradaRol-user" className={errors.nombre ? "errorEntrada-user" : ""}>
                  <p id="textoCuadro-user">Cargo</p>
                  <input
                    id="inputRegistro-user"
                    type="text"
                    name="cargo"
                    placeholder="Ingrese cargo"
                    onChange={handleChange}
                  />
                </div>  
                <p className="instruccion">Seleccione las opciones que le asignara al usuario*</p>
                <div className='listaAcciones'>
                  <div className='eventos'>
                    <h2>Eventos</h2>

                    <div className="accion">
                      <input
                        id="register-event"
                        type="checkbox"
                        name="register-event"
                        value={1}
                        onChange={(e) =>changeRegisterevent()}
                      />
                      <span className='nombreCheck'>Registrar Evento</span>
                    </div>

                    <div className="accion">
                      <input
                        id="edit-event"
                        type="checkbox"
                        name="edit-event"
                        value={1}
                        onChange={(e) =>changeEditevent()}
                      />
                      <span className='nombreCheck'>Editar Evento</span>
                    </div>

                    <div className="accion">
                      <input
                        id="register-typeevent"
                        type="checkbox"
                        name="register-typeevent"
                        value={1}
                        onChange={(e) =>changeRegistertypeevent()}
                      />
                      <span className='nombreCheck'>Crear Tipo de Evento</span>
                    </div>

                    <div className="accion">
                      <input
                        id="view-event"
                        type="checkbox"
                        name="view-event"
                        value={1}
                        onChange={(e) =>changeViewevent()}
                      />
                      <span className='nombreCheck'>Vizualizar Eventos</span>
                    </div>

                    <div className="accion">
                      <input
                        id="view-participants-event"
                        type="checkbox"
                        name="view-participants-event"
                        value={1}
                        onChange={(e) =>changeViewparticipantevent()}
                      />
                      <span className='nombreCheck'>Vizualizar participantes de Eventos</span>
                    </div>

                    <div className="accion">
                      <input
                        id="register-activity"
                        type="checkbox"
                        name="register-activity"
                        value={1}
                        onChange={(e) =>changeRegisteractivity()}
                      />
                      <span className='nombreCheck'>Registrar actividad</span>
                    </div>

                    <div className="accion">
                      <input
                        id="delete-activity"
                        type="checkbox"
                        name="delete-activity"
                        value={1}
                        onChange={(e) =>changeDeleteactivity()}
                      />
                      <span className='nombreCheck'>Eliminar actividad</span>
                    </div>

                    <div className="accion">
                      <input
                        id="configure-form"
                        type="checkbox"
                        name="confiture-form"
                        value={1}
                        onChange={(e) =>changeConfigureform()}
                      />
                      <span className='nombreCheck'>Configurar formulario</span>
                    </div>
    
                  </div>
                  <div className='administracion'>
                    <h2>Administración</h2>

                    <div className="accion">
                      <input
                        id="register-organizer"
                        type="checkbox"
                        name="register-organizer"
                        value={1}
                        onChange={(e) =>changeRegisterorganizer()}
                      />
                      <span className='nombreCheck'>Registrar Organizador</span>
                    </div>

                    <div className="accion">
                      <input
                        id="register-sponsor"
                        type="checkbox"
                        name="register-sponsor"
                        value={1}
                        onChange={(e) =>changeRegistersponsor()}
                      />
                      <span className='nombreCheck'>Registrar Patrocinador</span>
                    </div>

                    <div className="accion">
                      <input
                        id="administer-request"
                        type="checkbox"
                        name="administer-request"
                        value={1}
                        onChange={(e) =>changeAdministerrequest()}
                      />
                      <span className='nombreCheck'>Administrar Solicitudes</span>
                    </div>

                    <div className="accion">
                      <input
                        id="register-ad"
                        type="checkbox"
                        name="register-ad"
                        value={1}
                        onChange={(e) =>changeRegisterad()}
                      />
                      <span className='nombreCheck'>Crear Anuncio</span>
                    </div>

                  </div>
                  
                  <div className='reportes'>
                    <h2>Reportes</h2>

                    <div className="accion">
                      <input
                        id="general-report"
                        type="checkbox"
                        name="general-report"
                        value={1}
                        onChange={(e) =>changeGeneralreport()}
                      />
                      <span className='nombreCheck'>Reporte General</span>
                    </div>

                  </div>
                </div>
              <div className="botonEnviar-user">
                <button className="botonRegistrar-user" type="submit" onClick={reiniciarPagina}>
                  {" "} Registrar</button>
              </div>
            </form>
          </div>
        </div>
    </div>
    </div>
  );
}

export default FormRegistroTipoUser;