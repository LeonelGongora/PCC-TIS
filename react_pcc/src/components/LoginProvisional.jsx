import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const login ='http://127.0.0.1:8000/api/login';
const TipoUsuario_Api_Url='configure.REGISTROTIPO_API_URL';

function LoginProvisional(){

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
  }

  // useEffect(() => {
  //   console.log(formData.email) 
  //   console.log(formData.password) 
  // });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post(login, {
      email: formData.email,
      password: formData.password
    })
    .then(response=>{
      // console.log("Exito")
      //Almacenar los datos de forma global en cookies
      cookies.set('login_userId', response.data[0].id, {path: "/"});
      cookies.set('login_userCargo', response.data[0].cargo, {path: "/"});
      cookies.set('login_userPrivilegio', response.data[0].privilegio, {path: "/"});
      cookies.set('login_userNombre', response.data[0].nombre, {path: "/"});

      const usu = response.data[0].cargo;
      switch (usu){
        case "Administrador" :
          window.location.href='./';
          break;
        case "Participante" :
          cookies.set('id_usuario', response.data[0].id, {path: "/"});
          window.location.href='./home-participant';
          break; 
        default :
          window.location.href='./home';
          break; 
      }  

    })
    .catch(error=>{
      console.log('Usuario NO Registrado')
    })
  };

  return (
    <div className="container">
    <div className="d-flex align-items-center" style={{ height: "60vh", marginLeft:"20px", backgroundColor:"#EAF1F7"}}>
    <form onSubmit={handleSubmit}>

          <div>

            <br></br>
            <br></br>
           <p id="textoCuadro-user">Email</p>
              <input
                id="inputRegistro-user"
                type="text"
                name="email"
                placeholder="Ingrese Email"
                onChange={handleChange}
              />
            </div>

            <div id="entradaAp-user">
              <p id="textoCuadro-user">Password</p>
              <input
                id="inputRegistro-user"
                type="text"
                name="password"
                placeholder="Ingrese Password"
                onChange={handleChange}
              />
            </div>
            <div className="botonEnviar-user">
            <button className="botonRegistrar-user" type="submit">
              {" "}
              Iniciar Sesion
            </button>
          </div>
            </form>
    </div>
  </div>
  );
}

export default LoginProvisional;