//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './AppRaisa.css';
import NavbarUser from './components/NavBarCreateEvent';
import FormRegistroEvento from './components/FormRegistroEvento';


function AppRaisa() {

  return (
    
    <div className="App">
      <div className="background-image"></div> {}
      <div className="content">
        <NavbarUser/>
        <div class="contenedor">
          <h1>Taller sobre capacitación sobre el lenguaje c#</h1>
          <div class="formulario">
            <FormRegistroEvento/>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default AppRaisa;
