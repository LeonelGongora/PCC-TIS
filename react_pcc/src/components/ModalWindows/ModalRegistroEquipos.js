import React, {useState, useEffect} from  'react';
import axios from 'axios';
//import React, {Component} from 'react';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/FormUserInput.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import {URL_API} from '../../const';

const cookies = new Cookies();

const salir = <FontAwesomeIcon icon={faCircleXmark}/>
const subir = <FontAwesomeIcon icon={faArrowUpFromBracket}/>

function ModalRegistroEquipos({estadoEquipos, cambiarEstadoModalEquipos,cambiarEstadoWarningDNI}){

    const id_evento = cookies.get('id_evento');
    const id_equipo = cookies.get('id_equipo');
    const dni_no_registrados = cookies.get('dni_no_registrados');
    const indice_dni_no_registrados = cookies.get('indice_dni_no_registrados');
    const [contador, setContador] = useState(0);

    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        pais: '',
        email: '',
        telefono: '',
    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value,
        });
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            imagen_organizador: e.target.files[0]
          });
    }

    useEffect(()=>{
        //document.getElementById("tituloVentanaModal").innerHTML= "Registro de Usuario con DNI: " + dni_no_registrados[0]; 

    }, []);

    const salirVentanaModal = (e) => {
        cambiarEstadoModalEquipos(false);
        setValues({
            nombre_organizador : '',
            imagen_organizador: ''
        });
        setErrors({});
    }

    const seleccionarPais = (e) => {
        setValues({
          ...values,
          pais: e.target.value,
        });
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        
        if (!values.nombre.trim()) {
            validationErrors.nombre = "Este campo es obligatorio"
      
        } else if (!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú]$/.test(values.nombre)) {
            validationErrors.nombre = "Ingrese nombre(s) valido";
        }

        if (!values.apellido.trim()) {
            validationErrors.apellido = "Este campo es obligatorio";
        } else if (
            !/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,60}[A-Za-zÑñáéíóú]$/.test(values.apellido)) {
            validationErrors.apellido = "Ingrese apellido(s) valido(s)";
        }

        if (!values.pais.trim()) {
            validationErrors.pais = "Este campo es obligatorio";
        }

        if (!values.email.trim()) {
            validationErrors.email = "Este campo es obligatorio"
      
        } else if (!/^[A-Za-z0-9._%]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(values.email)) {
            validationErrors.email = "Ingrese correo valido";
        } else {
            /*
            for (let index = 0; index < usuarios.length; index++) {
              let email = usuarios[index].email.trim();
              let nuevo_email = values.email.trim();
      
              if (email === nuevo_email) {
                validationErrors.email =
                  "Ya existe un usuario registrado con este email";
                break;
              }
            }
             */
            
        }

        if (!values.telefono.trim()) {
            validationErrors.telefono = "Este campo es obligatorio";
        } else if (!/^[7|6][0-9]{7}$/.test(values.telefono)) {
            validationErrors.telefono = "Ingrese un numero valido";
        }


        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){

            const url = `${URL_API}/add-user-information`;
            const url_correo = `${URL_API}/enviar-correo`;
            const url_equipo = `${URL_API}/add-team_user`;
            let contraseña_generada = dni_no_registrados[contador] + values.pais

            const data = new FormData();
            const data_equipo = new FormData();

            data.append('nombre', values.nombre)
            data.append('apellido', values.apellido)
            data.append('ci', dni_no_registrados[contador])
            data.append('pais', values.pais)
            data.append('email', values.email)
            data.append('password', contraseña_generada)
            data.append('telefono', values.telefono)

            let id_usuario = 0

            axios.post(url, data).then(res => {
                id_usuario = res.data.ultimo_id;
                console.log(res)
                data_equipo.append('team_id', id_equipo)
                data_equipo.append('user_id', id_usuario)

                axios.post(url_equipo, data_equipo).then(res_equipo => {
                    console.log(res_equipo)
                    let contador_Aux = contador;
                    contador_Aux = contador_Aux + 1;
                    setContador(contador_Aux);

                    setValues({
                        nombre: '',
                        apellido: '',
                        pais: '',
                        email: '',
                        telefono: '',
                    });

                    document.querySelectorAll(".inputEvento").forEach(entrada =>{
                        entrada.value = ""
                    })

                    
                    
                    console.log("contador")
                    console.log(contador)

                    if ((contador + 1) === dni_no_registrados.length){
                        const myElement = document.getElementById("Boton-Registro-User");
                        myElement.disabled = true;
                        axios.post(url_correo, {
                            destinatario: values.email,
                            contenido: contraseña_generada,
                          })
                          .then((response) => {
                            //console.log(response.data.mensaje);
                            //console.log("Todos registrados")
                            window.location.href='./paginaRegistrarseEventos';
                            //cambiarEstadoModalRegistroUsuario(false);
                        });
                        
                    }else{
                        axios.post(url_correo, {
                            destinatario: values.email,
                            contenido: contraseña_generada,
                          })
                          .then((response) => {
                            console.log(response.data.mensaje);
                            //cambiarEstadoModalRegistroUsuario(false);
                        });
                        cookies.set('indice_dni_no_registrados', indice_dni_no_registrados + 1, {path: "/"});
                        cambiarEstadoModalEquipos(false);
                        cambiarEstadoWarningDNI(true);
                    }
                })
            })

        }
    }

    return (
      estadoEquipos && (
        <div className="Overlay">
          <div className="ContenedorModal contRegTeam">
            <div className="EncabezadoModal">
              <div className="tituloEvento">
                <h1>Registrar Usuario</h1>
              </div>

              <button className="BotonSalir" onClick={salirVentanaModal}>
                {salir}
              </button>
            </div>
            <div className="registroTipoEvento reqCont">
              <div className="crearEventos-user">
                <div className="textoEvento-user">
                  <p className="textoRegistro-user">Registro de Informacion</p>
                </div>
                <div className="entradaDatos-user">
                  <form onSubmit={saveTypeEvent} id="form1">
                    <div className="nombreAp-user">
                      <div
                        id="entradaNom-user"
                        className={errors.nombre ? "errorEntrada-user" : ""}
                      >
                        <p id="textoCuadro-user">Nombres*</p>
                        <input
                          id="inputRegistro-user"
                          type="text"
                          name="nombre"
                          placeholder="Ingrese nombre(s)"
                          onChange={handleInput}
                        />
                        {errors.nombre && (
                          <span className="advertencia-userNom">
                            {errors.nombre}
                          </span>
                        )}
                      </div>

                      <div
                        id="entradaAp-user"
                        className={errors.nombre ? "errorEntrada-user" : ""}
                      >
                        <p id="textoCuadro-user">Apellidos*</p>
                        <input
                          id="inputRegistro-user"
                          type="text"
                          name="apellido"
                          placeholder="Ingrese apellido(s)"
                          onChange={handleInput}
                        />
                        {errors.apellido && (
                          <span className="advertencia-userNom">
                            {errors.apellido}
                          </span>
                        )}
                      </div>
                    </div>

                    <div id="entrada-user">
                      <p id="textoCuadro-user">Seleccione un Pais*</p>
                      <select onChange={seleccionarPais}>
                        <option disabled selected>
                          {" "}
                          Seleccione un pais
                        </option>
                        <option value="Afganistán">Afganistán</option>
                        <option value="Albania">Albania</option>
                        <option value="Alemania">Alemania</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Antigua y Barbuda">
                          Antigua y Barbuda
                        </option>
                        <option value="Arabia Saudita">Arabia Saudita</option>
                        <option value="Argelia">Argelia</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaiyán">Azerbaiyán</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bangladés">Bangladés</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Baréin">Baréin</option>
                        <option value="Bélgica">Bélgica</option>
                        <option value="Belice">Belice</option>
                        <option value="Benín">Benín</option>
                        <option value="Bielorrusia">Bielorrusia</option>
                        <option value="Birmania/Myanmar">
                          Birmania/Myanmar
                        </option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia y Herzegovina">
                          Bosnia y Herzegovina
                        </option>
                        <option value="Botsuana">Botsuana</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Brunéi">Brunéi</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Bután">Bután</option>
                        <option value="Cabo Verde">Cabo Verde</option>
                        <option value="Camboya">Camboya</option>
                        <option value="Camerún">Camerún</option>
                        <option value="Canadá">Canadá</option>
                        <option value="Catar">Catar</option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Chipre">Chipre</option>
                        <option value="Ciudad del Vaticano">
                          Ciudad del Vaticano
                        </option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoras">Comoras</option>
                        <option value="Corea del Norte">Corea del Norte</option>
                        <option value="Corea del Sur">Corea del Sur</option>
                        <option value="Costa de Marfil">Costa de Marfil</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Croacia">Croacia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Dinamarca">Dinamarca</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egipto">Egipto</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Emiratos Árabes Unidos">
                          Emiratos Árabes Unidos
                        </option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Eslovaquia">Eslovaquia</option>
                        <option value="Eslovenia">Eslovenia</option>
                        <option value="España">España</option>
                        <option value="Estados Unidos">Estados Unidos</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Etiopía">Etiopía</option>
                        <option value="Filipinas">Filipinas</option>
                        <option value="Finlandia">Finlandia</option>
                        <option value="Fiyi">Fiyi</option>
                        <option value="Francia">Francia</option>
                        <option value="Gabón">Gabón</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Granada">Granada</option>
                        <option value="Grecia">Grecia</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea ecuatorial">
                          Guinea ecuatorial
                        </option>
                        <option value="Guinea-Bisáu">Guinea-Bisáu</option>
                        <option value="Haití">Haití</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hungría">Hungría</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Irak">Irak</option>
                        <option value="Irán">Irán</option>
                        <option value="Irlanda">Irlanda</option>
                        <option value="Islandia">Islandia</option>
                        <option value="Islas Marshall">Islas Marshall</option>
                        <option value="Islas Salomón">Islas Salomón</option>
                        <option value="Israel">Israel</option>
                        <option value="Italia">Italia</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japón">Japón</option>
                        <option value="Jordania">Jordania</option>
                        <option value="Kazajistán">Kazajistán</option>
                        <option value="Kenia">Kenia</option>
                        <option value="Kirguistán">Kirguistán</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Laos">Laos</option>
                        <option value="Lesoto">Lesoto</option>
                        <option value="Letonia">Letonia</option>
                        <option value="Líbano">Líbano</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libia">Libia</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lituania">Lituania</option>
                        <option value="Luxemburgo">Luxemburgo</option>
                        <option value="Macedonia del Norte">
                          Macedonia del Norte
                        </option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malasia">Malasia</option>
                        <option value="Malaui">Malaui</option>
                        <option value="Maldivas">Maldivas</option>
                        <option value="Malí">Malí</option>
                        <option value="Malta">Malta</option>
                        <option value="Marruecos">Marruecos</option>
                        <option value="Mauricio">Mauricio</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="México">México</option>
                        <option value="Micronesia">Micronesia</option>
                        <option value="Moldavia">Moldavia</option>
                        <option value="Mónaco">Mónaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Níger">Níger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Noruega">Noruega</option>
                        <option value="Nueva Zelanda">Nueva Zelanda</option>
                        <option value="Omán">Omán</option>
                        <option value="Países Bajos">Países Bajos</option>
                        <option value="Pakistán">Pakistán</option>
                        <option value="Palaos">Palaos</option>
                        <option value="Panamá">Panamá</option>
                        <option value="Papúa Nueva Guinea">
                          Papúa Nueva Guinea
                        </option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Perú">Perú</option>
                        <option value="Polonia">Polonia</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Reino Unido">Reino Unido</option>
                        <option value="República Centroafricana">
                          República Centroafricana
                        </option>
                        <option value="República Checa">República Checa</option>
                        <option value="República del Congo">
                          República del Congo
                        </option>
                        <option value="República Democrática del Congo">
                          República Democrática del Congo
                        </option>
                        <option value="República Dominicana">
                          República Dominicana
                        </option>
                        <option value="República Sudafricana">
                          República Sudafricana
                        </option>
                        <option value="Ruanda">Ruanda</option>
                        <option value="Rumanía">Rumanía</option>
                        <option value="Rusia">Rusia</option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Cristóbal y Nieves">
                          San Cristóbal y Nieves
                        </option>
                        <option value="San Marino">San Marino</option>
                        <option value="San Vicente y las Granadinas">
                          San Vicente y las Granadinas
                        </option>
                        <option value="Santa Lucía">Santa Lucía</option>
                        <option value="Santo Tomé y Príncipe">
                          Santo Tomé y Príncipe
                        </option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leona">Sierra Leona</option>
                        <option value="Singapur">Singapur</option>
                        <option value="Siria">Siria</option>
                        <option value="Somalia">Somalia</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Suazilandia">Suazilandia</option>
                        <option value="Sudán">Sudán</option>
                        <option value="Sudán del Sur">Sudán del Sur</option>
                        <option value="Suecia">Suecia</option>
                        <option value="Suiza">Suiza</option>
                        <option value="Surinam">Surinam</option>
                        <option value="Tailandia">Tailandia</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Tayikistán">Tayikistán</option>
                        <option value="Timor Oriental">Timor Oriental</option>
                        <option value="Togo">Togo</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad y Tobago">
                          Trinidad y Tobago
                        </option>
                        <option value="Túnez">Túnez</option>
                        <option value="Turkmenistán">Turkmenistán</option>
                        <option value="Turquía">Turquía</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Ucrania">Ucrania</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistán">Uzbekistán</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Yibuti">Yibuti</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabue">Zimbabue</option>
                      </select>
                    </div>

                    {errors.pais && (
                      <span className="advertencia-user">{errors.pais}</span>
                    )}

                    <div id="entrada-user">
                      <p id="textoCuadro-user">Email*</p>
                      <input
                        id="inputRegistro-user"
                        type="text"
                        name="email"
                        placeholder="Ingrese su correo"
                        onChange={handleInput}
                      />
                    </div>

                    {errors.email && (
                      <span className="advertencia-user">{errors.email}</span>
                    )}

                    <div id="entrada-user">
                      <p id="textoCuadro-user">Telefono*</p>
                      <input
                        id="inputRegistro-user"
                        type="number"
                        name="telefono"
                        placeholder="Ingrese su telefono"
                        onChange={handleInput}
                      />
                    </div>

                    {errors.telefono && (
                      <span className="advertencia-user">
                        {errors.telefono}
                      </span>
                    )}

                    <div className="botonEnviar-user">
                      <button
                        id="Boton-Registro-User"
                        form="form1"
                        className="botonRegistrar-user"
                        type="submit"
                      >
                        {" "}
                        Registrar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
}

export default ModalRegistroEquipos; 