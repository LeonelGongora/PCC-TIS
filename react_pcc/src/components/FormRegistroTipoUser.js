import { useState, useEffect } from "react";
import axios from 'axios';

import FormUserInput from "../stylesheets/FormUserInput.css";

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
    <div className="crearEventos-user">
      <div className="textoEvento-user">
        <p className="textoRegistro-user">Registro de Tipo Usuario</p>
      </div>
      
      <div className="entradaDatos-user">
        <form onSubmit={saveTipo}>

        <div className="botonEnviar-user">
            <button className="botonRegistrar-user" type="submit">
              {" "}
              Registrar
            </button>
          </div>
          <div className="nombreAp-user">
            <div id="entradaNom-user" className={errors.nombre ? "errorEntrada-user" : ""}>
              <p id="textoCuadro-user">Cargo</p>
              <input
                id="inputRegistro-user"
                type="text"
                name="cargo"
                placeholder="Ingrese cargo"
                onChange={handleChange}
              />

              Registrar Evento
              <input
                
                id="registrar-evento"
                type="checkbox"
                name="registrar-evento"
                value={1}
                onChange={(e) =>cambiaRegisterEvent()}
              />
              <hr></hr>
              Crear Tipo de Evento
              <input
                
                id="crear-tipoevent"
                type="checkbox"
                name="crear-tipoevent"
                value={1}
                onChange={(e) =>cambiaCrearTipoEvent()}
              />
              <hr></hr>
              Registrar Organizador
              <input
                
                id="register-organizador"
                type="checkbox"
                name="register-organizador"
                value={1}
                onChange={(e) =>cambiaRegistrarOrganizador()}
              />
              <hr></hr>
              Registrar Patrocinador
              <input
                
                id="register-patrocinador"
                type="checkbox"
                name="register-patrocinador"
                value={1}
                onChange={(e) =>cambiaRegistrarPatrocinador()}
              />
              <hr></hr>
              Administrar Solicitudes
              <input
                
                id="administrar-soli"
                type="checkbox"
                name="administrar-soli"
                value={1}
                onChange={(e) =>cambiaAdministrarSolicitud()}
              />
              <hr></hr>
              Editar Evento
              <input
                
                id="edit-event"
                type="checkbox"
                name="edit-event"
                value={1}
                onChange={(e) =>cambiaEditarEvento()}
              />

            </div>
          </div>

          <br></br>
          
        </form>
      </div>
    </div>
  );
}

export default FormRegistroTipoUser;