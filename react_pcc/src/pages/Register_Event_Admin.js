
import React from 'react';
import NavbarCreateEvent from '../components/NavBarCreateEvent';
import Add_Event from './Add_Event';
import "../stylesheets/RegisterEventAdminStyles.css";

function Register_Event_Admin() {
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