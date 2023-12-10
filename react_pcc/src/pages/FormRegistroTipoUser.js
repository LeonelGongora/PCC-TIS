import { useState, useEffect } from "react";
import axios from 'axios';
import "../stylesheets/TipoDeUsuarioStyles.css";
import NavbarCreateEvent from '../components/NavBars/NavBarCreateEvent';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function FormRegistroTipoUser() {

  const [formData, setFormData] = useState({
    cargo: '',
  })

  const [errors, setErrors] = useState({})

  const [privilegio, setPrivilegio] = useState('')
  const [registerevent, setRegisterevent] = useState(0);
  const [tipoevent, setTipoevent] = useState(0);
  const [registerOrganizador, setRegisterOrganizador] = useState(0);
  const [registerPatrocinador, setRegisterPatrocinador] = useState(0);
  const [adminSolicitud, setAdminSolicitud] = useState(0);
  const [editEvento, setEditEvent] = useState(0);

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

    const u = "http://127.0.0.1:8000/api/tipos";
    axios.post(u, {
      cargo: formData.cargo,
      privilegio: privilegio
    }).then(response=>{
      console.log("exito")
      // window.location.href = './login';
    })
  }

  useEffect(() => {
    setPrivilegio(`${registerevent},${tipoevent},${registerOrganizador},${registerPatrocinador},${adminSolicitud},${editEvento}`)
  }, [registerevent, tipoevent, registerOrganizador, registerPatrocinador, adminSolicitud,
      editEvento]);

  const cambiaRegisterEvent =(e) =>{
    if (registerevent==1) setRegisterevent(0)
    else setRegisterevent(1)
  };

  const cambiaCrearTipoEvent =(e) =>{
    if (tipoevent==1) setTipoevent(0)
    else setTipoevent(1)
  };

  const cambiaRegistrarOrganizador =(e) =>{
    if (registerOrganizador==1) setRegisterOrganizador(0)
    else setRegisterOrganizador(1)
  };

  const cambiaRegistrarPatrocinador =(e) =>{
    if (registerPatrocinador==1) setRegisterPatrocinador(0)
    else setRegisterPatrocinador(1)
  };

  const cambiaAdministrarSolicitud =(e) =>{
    if (adminSolicitud==1) setAdminSolicitud(0)
    else setAdminSolicitud(1)
  };

  const cambiaEditarEvento =(e) =>{
    if (editEvento==1) setEditEvent(0)
    else setEditEvent(1)
  };

  return (
    <div className="App">
      <div className="background-image"></div>
      <div className="content">
        <NavbarCreateEvent/>
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
                <div className='listaAcciones'>
                  <div className='eventos'>
                    <h2>Eventos</h2>
                    <div className="accion">
                      <input
                        id="registrar-evento"
                        type="checkbox"
                        name="registrar-evento"
                        value={1}
                        onChange={(e) =>cambiaRegisterEvent()}
                      />
                      <span className='nombreCheck'>Registrar Evento</span>
                    </div>
                    <div className="accion">
                      <input
                        id="crear-tipoevent"
                        type="checkbox"
                        name="crear-tipoevent"
                        value={1}
                        onChange={(e) =>cambiaCrearTipoEvent()}
                      />
                      <span className='nombreCheck'>Crear Tipo de Evento</span>
                    </div>
                    <div className="accion">
                      <input
                        id="edit-event"
                        type="checkbox"
                        name="edit-event"
                        value={1}
                        onChange={(e) =>cambiaEditarEvento()}
                      />
                      <span className='nombreCheck'>Editar Evento</span>
                    </div>
                  </div>

                  <div className='administracion'>
                    <h2>Administración</h2>
                    <div className="accion">
                      <input
                        id="register-organizador"
                        type="checkbox"
                        name="register-organizador"
                        value={1}
                        onChange={(e) =>cambiaRegistrarOrganizador()}
                      />
                      <span className='nombreCheck'>Registrar Organizador</span>
                    </div>
                    <div className="accion">
                      <input
                        id="register-patrocinador"
                        type="checkbox"
                        name="register-patrocinador"
                        value={1}
                        onChange={(e) =>cambiaRegistrarPatrocinador()}
                      />
                      <span className='nombreCheck'>Registrar Patrocinador</span>
                    </div>
                    <div className="accion">
                      <input
                        id="administrar-soli"
                        type="checkbox"
                        name="administrar-soli"
                        value={1}
                        onChange={(e) =>cambiaAdministrarSolicitud()}
                      />
                      <span className='nombreCheck'>Administrar Solicitudes</span>
                    </div>
                  </div>
                  
                  <div className='reportes'>
                    <h2>Reportes</h2>
                  </div>
                </div>
              <div className="botonEnviar-user">
                <button className="botonRegistrar-user" type="submit">
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