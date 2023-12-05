import React from 'react';
import NavbarCreateEvent from '../components/NavBars/NavBarCreateEvent';
import Add_Event_NextAlt from '../components/Add_Event_NextAlt';
import "../stylesheets/RegisterEventAdminStyles.css";

function Register_Event_Admin_NextAlt() {
  return (
    <div className="AppManu">
      <div className="background-image-Manu"></div>
      <div className="content-Manu">
        <div className='navegacion'>
            <NavbarCreateEvent/>          
        </div>
        <div className='contenido-Manu'>
            <Add_Event_NextAlt/>
        </div>
      </div>
    </div>
  );
}
export default Register_Event_Admin_NextAlt;