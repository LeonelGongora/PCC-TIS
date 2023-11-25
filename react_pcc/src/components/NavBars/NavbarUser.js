import React from 'react';
import "../../stylesheets/NavbarStyles.css";
import DropdownUser from '../DropDownUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

function NavbarUser(){
    return (
      <nav>
        <div className='logoName'>
          <h1 className='name'>PCC</h1>
          <a href="">
            <img
              className="imageNav"
              src={require("../../images/logo512.png")}
              alt="Logo del sistema"
            />
          </a>
        </div>
        <div className='navbarRight'>
          <div className='desplegable1'>
            <DropdownUser/>
          </div>
            <a><FontAwesomeIcon className='buttonNoti' icon={faBell} /></a>
            <div className='userId'>
              <a><FontAwesomeIcon className='userIcon' icon={faUser} /></a>
            </div>
            <div>
            </div>
          </div>
      </nav>
    );
}

export default NavbarUser;