import { useState, useEffect } from "react";
import axios from 'axios';
import FormUserInput from "../stylesheets/FormUserDinamico.css";

import Cookies from 'universal-cookie';
const cookies = new Cookies();


function FormRegistroUsuarioDinamico() {

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    ci : '',
    email: '',
    password: '',
    confirmarPassword: '',
    telefono: '',

  })

  const [errors, setErrors] = useState({})
  const [usuarios, setUsuarios] = useState({})
  const [tipos, setTipos] = useState([])
  const [tipo, setTipo] = useState('')

  useEffect(()=>{
    getUsuarios();
    getTipos();
  }, []);

  // useEffect(()=>{
  //   console.log(tipo)
  // }, [tipo]);

  const selectTipo= (e)=>{
    setTipo(e.target.value);
  }
  
  const getUsuarios = async (e) => {
    const url = "http://127.0.0.1:8000/api/get-user-information"; 
    const respuesta = await axios.get(url);
    setUsuarios(respuesta.data.usuarios);
  }

  const getTipos = async (e) => {
    const url = "http://127.0.0.1:8000/api/tipos"; 
    const respuesta = await axios.get(url);
    setTipos(respuesta.data)
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

    if (!formData.ci.trim()) {
      validationErrors.ci = "Este campo es obligatorio"
    } else if (!/^(?!-)[1-9][0-9]{6,8}$/.test(formData.ci)) {
      validationErrors.ci = "Ingrese un CI valido";
    }else{
      for (let index = 0; index < usuarios.length; index++) {

        let ci = usuarios[index].ci
        let nuevo_ci = formData.ci

        console.log(ci)
        console.log(nuevo_ci)
        console.log(typeof(ci))
        console.log(typeof(nuevo_ci))

        if(ci == nuevo_ci){
            validationErrors.ci = "Ya existe un usuario registrado con este CI"
            break;
        }
      }
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
      data.append('ci', formData.ci)
      data.append('pais', 'Bolivia')
      data.append('telefono', formData.telefono)
      data.append('email', formData.email)
      data.append('password', formData.password)

      axios.post(url, data).then(res => {
        // console.log(res)
        // console.log(res.data.ultimo_id)
        // cookies.set('id_usuario', res.data.ultimo_id, { path: "/" });
        const u = "http://127.0.0.1:8000/api/tipousers";
        axios.post(u, {
          tipo_id: tipo,
          user_id: res.data.ultimo_id
        }).then(response=>{
          // console.log("exito")
          window.location.href = './login';
        })
      })
    }

  }


  return (
    <div className="crearEventos-user">
      <div className="textoEvento-user">
        <p className="textoRegistro-user">Registro de Usuario Privilegiado</p>
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
            <p id="textoCuadro-user">CI (Carnet de Identidad)*</p>
            <input
              id="inputRegistro-user"
              type="number"
              name="ci"
              placeholder="Ingrese su carnet de identidad"
              onChange={handleChange}
            />
          </div>
          {errors.ci && (
            <span className="advertencia-user">{errors.ci}</span>
          )}

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

                  <div id="entrada">
                    <p id="textoCuadro">Tipo de Usuario</p>
                    <select 
                    onChange={selectTipo}
                    id="desplegable">
                      <option disabled selected>
                        {" "}
                        Seleccione un tipo
                      </option>
                      {tipos.map((tipos, id) => {
                        return <option
                          key={tipos.id}
                          value={tipos.id}
                          // onClick={()=>selectTipo("1")}
                        >{tipos.cargo}</option>;
                      })}
                    </select>
                  </div>

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

export default FormRegistroUsuarioDinamico;