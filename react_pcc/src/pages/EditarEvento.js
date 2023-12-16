import React, {useState} from 'react';
import "../stylesheets/ContenedorSliderStyles.css";
import EditarInformacionDeEventos from '../components/EditarInformacionDeEventos';
import NavbarAdmin from '../components/NavBars/NavbarAdmin';
import ModalWindow from '../components/ModalWindows/ModalWindow';
import ModalWindowOrganizadores from '../components/ModalWindows/ModalWindowOrganizadores';
import ModalWindowPatrocinadores from '../components/ModalWindows/ModalWindowPatrocinadores';
import ModalAnuncio from '../components/ModalWindows/ModalAnuncio';


function EditarEvento(){
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [estadoModalOrganizador, cambiarEstadoModalOrganizador] = useState(false);
  const [estadoModalPatrocinador, cambiarEstadoModalPatrocinador] = useState(false);
  const [estadoModalAnuncio, cambiarEstadoModalAnuncio] = useState(false);  
  return (
    <div className="containerSlider">
      <ModalWindow estado1={estadoModal} cambiarEstado1={cambiarEstadoModal} />
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
      <EditarInformacionDeEventos />
    </div>
  );
}
export default EditarEvento;