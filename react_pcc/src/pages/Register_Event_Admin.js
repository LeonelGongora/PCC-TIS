
import React, {useState} from 'react';
import NavbarCreateEvent from '../components/NavBars/NavBarCreateEvent';
import Add_Event from './Add_Event';
import "../stylesheets/RegisterEventAdminStyles.css";
import NavbarAdmin from '../components/NavBars/NavbarAdmin';
import ModalWindow from '../components/ModalWindows/ModalWindow';
import ModalWindowOrganizadores from '../components/ModalWindows/ModalWindowOrganizadores';
import ModalWindowPatrocinadores from '../components/ModalWindows/ModalWindowPatrocinadores';
import ModalAnuncio from '../components/ModalWindows/ModalAnuncio';

function Register_Event_Admin() {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [estadoModalOrganizador, cambiarEstadoModalOrganizador] = useState(false);
  const [estadoModalPatrocinador, cambiarEstadoModalPatrocinador] = useState(false);
  const [estadoModalAnuncio, cambiarEstadoModalAnuncio] = useState(false);
  return (
    <div className="AppManu">
      <ModalWindow
        estado1={estadoModal}
        cambiarEstado1={cambiarEstadoModal}
      />
      <ModalWindowOrganizadores
        estadoOrganizador={estadoModalOrganizador}
        cambiarEstadoModalOrganizador={cambiarEstadoModalOrganizador}
      />
      <ModalWindowPatrocinadores
        estadoPatrocinador={estadoModalPatrocinador}
        cambiarEstadoModalPatrocinador={cambiarEstadoModalPatrocinador}
      />
      <ModalAnuncio
        estadoAnuncio={estadoModalAnuncio}
        cambiarEstadoAnuncio={cambiarEstadoModalAnuncio}
      />
      <div className="background-image-Manu"></div>
      <div className="content-Manu">
          <NavbarAdmin
            estado1={estadoModal}
            cambiarEstado1={cambiarEstadoModal}
            estadoOrganizador={estadoModalOrganizador}
            cambiarEstadoOrganizador={cambiarEstadoModalOrganizador}
            estadoPatrocinador={estadoModalPatrocinador}
            cambiarEstadoPatrocinador={cambiarEstadoModalPatrocinador}
            estadoAnuncio={estadoModalAnuncio}
            cambiarEstadoAnuncio={cambiarEstadoModalAnuncio}
          />
        <div className="contenido-Manu">
          <Add_Event />
        </div>
      </div>
    </div>
  );
}
export default Register_Event_Admin;