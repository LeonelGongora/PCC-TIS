import { useState, useEffect } from "react";
import axios from 'axios';

import FormUserInput from "../stylesheets/FormUserInput.css";

import Cookies from 'universal-cookie';
const cookies = new Cookies();


function FormRegistroUsuario() {

  const ci = cookies.get('ci_nuevo_usuario');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmarPassword: '',
    telefono: '',

  })

  const [errors, setErrors] = useState({})
  const [usuarios, setUsuarios] = useState({})

  useEffect(()=>{
    getUsuarios();
    console.log(ci)
  }, []);

  
  const getUsuarios = async (e) => {
    const url = "http://127.0.0.1:8000/api/get-user-information"; 
    const respuesta = await axios.get(url);
    setUsuarios(respuesta.data.usuarios);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
  }

  const saveUser = async (e) => {
    e.preventDefault();
    console.log(usuarios)

    const validationErrors = {};

    if (!formData.nombre.trim()) {
      validationErrors.nombre = "Este campo es obligatorio"


    } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú]$/.test(formData.nombre)) {
      validationErrors.nombre = "Ingrese nombre(s) valido";
    }

    if (!formData.apellido.trim()) {
      validationErrors.apellido = "Este campo es obligatorio"

    } else if (
      !/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú]$/.test(formData.apellido)
    ) {
      validationErrors.apellido = "Ingrese apellido(s) valido(s)";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Este campo es obligatorio"

    } else if (!/^[A-Za-z0-9._%]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      validationErrors.email = "Ingrese correo valido";
    }else{
      for (let index = 0; index < usuarios.length; index++) {

        let email = usuarios[index].email.trim()
        let nuevo_email = formData.email.trim()

        if(email === nuevo_email){
            validationErrors.email = "Ya existe un usuario registrado con este email"
            break;
        }
      }
    }

    if (formData.password !== formData.confirmarPassword) {
      validationErrors.password = "Las contraseñas debe coincidir"
      validationErrors.confirmarPassword = "Las contraseñas debe coincidir"
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Este campo es obligatorio"

    } else if (!/^\S[A-Z|a-z|0-9|áéíóú]{3,70}\S$/.test(formData.password)) {
      validationErrors.password = "Ingrese una contraseña valida"
    }else{
      
    }

    if (!formData.confirmarPassword.trim()) {
      validationErrors.confirmarPassword = "Este campo es obligatorio"
    }
    
    if (!formData.telefono.trim()) {
      validationErrors.telefono = "Este campo es obligatorio"

    } else if (!/^[7|6][0-9]{7}$/.test(formData.telefono)) {
      validationErrors.telefono = "Ingrese un numero valido"
    }


    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const url = "http://127.0.0.1:8000/api/add-user-information";

      const data = new FormData();
      data.append('nombre', formData.nombre)
      data.append('apellido', formData.apellido)
      data.append('ci', ci)
      data.append('email', formData.email)
      data.append('password', formData.password)
      data.append('telefono', formData.telefono)

      axios.post(url, data).then(res => {
        cookies.set('id_usuario', res.data.ultimo_id, { path: "/" });
        window.location.href = './register-to-event';
      })
    }

  }


  return (
    <div className="crearEventos-user">
      <div className="textoEvento-user">
        <p className="textoRegistro-user">Registro de Informacion</p>
      </div>
      <div className="entradaDatos-user">
        <form onSubmit={saveUser}>
          <div className="nombreAp-user">
            <div id="entradaNom-user" className={errors.nombre ? "errorEntrada-user" : ""}>
              <p id="textoCuadro-user">Nombres*</p>
              <input
                id="inputRegistro-user"
                type="text"
                name="nombre"
                placeholder="Ingrese nombre(s)"
                onChange={handleChange}
              />
              {errors.nombre && (
                  <span className="advertencia-userNom">{errors.nombre}</span>
              )}
            </div>

            <div id="entradaAp-user" className={errors.nombre ? "errorEntrada-user" : ""}>
              <p id="textoCuadro-user">Apellidos*</p>
              <input
                id="inputRegistro-user"
                type="text"
                name="apellido"
                placeholder="Ingrese apellido(s)"
                onChange={handleChange}
              />
              {errors.apellido && (
                  <span className="advertencia-userNom">{errors.apellido}</span>
              )}
            </div>
          </div>

          <div id="entrada-user">
            <p id="textoCuadro-user">Email*</p>
            <input
              id="inputRegistro-user"
              type="text"
              name="email"
              placeholder="Ingrese su correo"
              onChange={handleChange}
            />
          </div>

          {errors.email && (
            <span className="advertencia-user">{errors.email}</span>
          )}

          <div id="entrada-user">
            <p id="textoCuadro-user">Contraseña*</p>
            <input
              id="inputRegistro-user"
              type="password"
              name="password"
              placeholder="Ingrese una contraseña"
              onChange={handleChange}
            />
          </div>

          {errors.password && (
            <span className="advertencia-user">{errors.password}</span>
          )}

          <div id="entrada-user">
            <p id="textoCuadro-user">Confirmar Contraseña*</p>
            <input
              id="inputRegistro-user"
              type="password"
              name="confirmarPassword"
              placeholder="Repita la contraseña ingresada"
              onChange={handleChange}
            />
          </div>

          {errors.confirmarPassword && (
            <span className="advertencia-user">{errors.confirmarPassword}</span>
          )}

          <div id="entrada-user">
            <p id="textoCuadro-user">Telefono*</p>
            <input
              id="inputRegistro-user"
              type="number"
              name="telefono"
              placeholder="Ingrese su telefono"
              onChange={handleChange}
            />
          </div>

          {errors.telefono && (
            <span className="advertencia-user">{errors.telefono}</span>
          )}

          <div className="botonEnviar-user">
            <button className="botonRegistrar-user" type="submit">
              {" "}
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormRegistroUsuario;