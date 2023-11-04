import React from "react";
import "../stylesheets/RegisterFormUser.css";
import NavbarCreateEvent from "../components/NavBarCreateEvent";
import FormRegistroUsuario from "../components/FormRegistroUsuario";

function FormRegisterUser() {
	return (
    <div className="AppManu-user">
      <div className="background-image-Manu-user"></div>
      <div className="content-Manu-user">
        <div className="navegacion-user">
          <NavbarCreateEvent />
        </div>
        <div className="contenido-Manu-user">
          <FormRegistroUsuario />
        </div>
      </div>
    </div>
  );

}
export default FormRegisterUser;