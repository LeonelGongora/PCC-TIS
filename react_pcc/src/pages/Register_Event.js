import "../stylesheets/RegisterEventStyles.css";
//import NavbarUser from './components/NavBarCreateEvent';
import FormRegistroEvento from '../components/FormRegistroEvento';



function Register_Event() {

  return (

    <div className="App-Register-Event">
      <div className="background-image-Register-Event"></div> {}
      <div className="content-Register-Event">
        
        <div class="contenedor">
          <h1 className="title-Register-Event">Taller sobre capacitación sobre el lenguaje c#</h1>
          <div class="formulario">
            <FormRegistroEvento/>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Register_Event;