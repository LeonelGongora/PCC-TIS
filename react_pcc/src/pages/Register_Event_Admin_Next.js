
import React from 'react';
import NavbarCreateEvent from '../components/NavBarCreateEvent';
import Add_Event_Next from './Add_Event_Next';
import "../stylesheets/RegisterEventAdminStyles.css";

function Register_Event_Admin_Next() {
  return (
    <div className="AppManu">
      <div className="background-image-Manu"></div>
      <div className="content-Manu">
        <div className='navegacion'>
            <NavbarCreateEvent/>          
        </div>
        <div className='contenido-Manu'>
            <Add_Event_Next/>
        </div>
      </div>
    </div>
  );
}
export default Register_Event_Admin_Next;