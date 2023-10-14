import React, {useState} from 'react';
import './AppManu.css';
import NavbarCreateEvent from './components/NavBarCreateEvent';
import CreateEvents from './components/CreateEvents'; 
import ModalWindow from './components/ModalWindow';



function AppManu() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);  
  return (
    <div className="AppManu">
      <ModalWindow estado={estadoModal1} cambiarEstado={cambiarEstadoModal1} />
      <div className="background-image"></div>
      <div className="content">
        <div className='navegacion'>
          <NavbarCreateEvent/>          
        </div>
        <div className='contenido'>
          <CreateEvents estado={estadoModal1} cambiarEstado={cambiarEstadoModal1}/>
        </div>
      </div>
    </div>
  );
}

export default AppManu;

