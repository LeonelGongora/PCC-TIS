import { useState } from "react";
import axios from 'axios';


import Cookies from 'universal-cookie';
const cookies = new Cookies();

import "../stylesheets/FormUserInput.css";
function FormRegistroUsuario(){

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmarPassword : '',
        telefono: '',

    })

    const getUser =async()=>{
        //const url = `${Eventos_Api_Url}/${id}`;
        //const response = await axios.get(url)
        //setEvent(response.data)
    }

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })

    }

    const saveUser = (e) => {
        e.preventDefault()

        const validationErrors = {};

        if(!formData.nombre.trim()){
            validationErrors.nombre = "Este campo es obligatorio"
            
            
        }else if(!/^\S[A-Z|a-z|.|0-9|Ñ|ñ|áéíóú|\s|,]{3,150}\S$/.test(formData.nombre)){
            validationErrors.nombre = "Ingrese nombre(s) valido"
        }


        if(!formData.apellido.trim()){
            validationErrors.apellido = "Este campo es obligatorio"
            
            
        }else if(!/^\S[A-Z|a-z|.|0-9|Ñ|ñ|áéíóú|\s|,]{3,150}\S$/.test(formData.apellido)){
            validationErrors.apellido = "Ingrese apellido(s) valido"
        }



        if(!formData.email.trim()){
            validationErrors.email = "Este campo es obligatorio"
            
            
        }else if(!/^\S[A-Z|a-z|.|0-9|Ñ|ñ|áéíóú|\s|,]{3,150}\S$/.test(formData.email)){
            validationErrors.email = "Ingrese correo valido"
        }



        if(!formData.password.trim()){
            validationErrors.password = "Este campo es obligatorio"
            
            
        }else if(!/^\S[A-Z|a-z|.|0-9|Ñ|ñ|áéíóú|\s|,]{3,150}\S$/.test(formData.password)){
            validationErrors.password = "Ingrese una contraseña valida"
        }


        if(formData.password !== formData.confirmarPassword){
            validationErrors.password = "La contraseña debe coincidir"
            validationErrors.confirmarPassword = "La contraseña debe coincidir"
        }

        

        if(!formData.telefono.trim()){
            validationErrors.telefono = "Este campo es obligatorio"

        }else if(!/[7|6][0-9]{7}$/.test(formData.telefono)){
            validationErrors.telefono = "Ingrese un numero valido"
        }


        setErrors(validationErrors)

        if(Object.keys(validationErrors).length === 0){
            const url = "http://127.0.0.1:8000/api/add-user-information"; 

            const data = new FormData();
            data.append('nombre', formData.nombre)
            data.append('apellido', formData.apellido)
            data.append('email', formData.email)
            data.append('password', formData.password)
            data.append('telefono', formData.telefono)

            axios.post(url, data).then(res => {
                console.log(res)
                console.log(res.data.ultimo_id)
                cookies.set('id_usuario', res.data.ultimo_id, {path: "/"});
                window.location.href='./home-participant';
            })

            
        }

    }


    return (
      <div className="crearEventos-user">
        <div className="textoEvento-user">
          <p className="textoRegistro-user">Registrarse</p>
        </div>
        <div className="entradaDatos-user">
          <form onSubmit={saveUser}>
            <div className="nombreAp-user">
              <div id="entradaNom-user">
                <p id="textoCuadro-user">Nombres*</p>
                <input
                  id="inputRegistro-user"
                  type="text"
                  name="nombre"
                  placeholder="Ingrese nombre"
                  onChange={handleChange}
                />
              </div>

              {errors.nombre && (
                <span className="advertencia-user">{errors.nombre}</span>
              )}

              <div id="entradaAp-user">
                <p id="textoCuadro-user">Apellidos*</p>
                <input
                  id="inputRegistro-user"
                  type="text"
                  name="apellido"
                  placeholder="Ingrese nombre"
                  onChange={handleChange}
                />
              </div>

              {errors.apellido && (
                <span className="advertencia-user">{errors.apellido}</span>
              )}
            </div>

            <div id="entrada-user">
              <p id="textoCuadro-user">Email*</p>
              <input
                id="inputRegistro-user"
                type="text"
                name="email"
                placeholder="Ingrese nombre"
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
              <span className="advertencia-user">
                {errors.confirmarPassword}
              </span>
            )}

            <div id="entrada-user">
              <p id="textoCuadro-user">Telefono*</p>
              <input
                id="inputRegistro-user"
                type="number"
                name="telefono"
                placeholder="Repita la contraseña ingresada"
                onChange={handleChange}
              />
            </div>

            {errors.telefono && (
              <span className="advertencia-user">{errors.telefono}</span>
            )}

            <div className="botonEnviar-user">
              <button className="botonRegistrar-user" type="submit">
                {" "}
                Registrar evento
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default FormRegistroUsuario;