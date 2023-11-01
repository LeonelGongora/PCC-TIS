
import React, {useState} from 'react';
import NavbarCreateEvent from '../components/NavBarCreateEvent';
//import CreateEvents from './components/CreateEvents'; 
import ModalWindow from '../components/ModalWindow';
import Add_Event from './Add_Event';
import "../stylesheets/RegisterEventAdminStyles.css";

function Register_Event_Admin() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false); 
  return (
    <div className="AppManu">
      <div className="background-image-Manu"></div>
      <div className="content-Manu">
        <div className='navegacion'>
          <NavbarCreateEvent/>          
        </div>
        <div className='contenido-Manu'>
        <Add_Event/>
        </div>
      </div>
    </div>
  );
}
export default Register_Event_Admin;