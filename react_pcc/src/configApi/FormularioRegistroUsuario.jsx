import React, { useState } from 'react';
import { Form, Button, Col, Row,Modal } from 'react-bootstrap';
import axios from 'axios';

import configApi from './configApi';

const Usuario_Api_Url = configApi.USUARIO_API_URL;
const Imagen_Api_Url = configApi.IMAGENSTORAGE_API_URL;

const FormularioRegistroUsuario = () => {
const [showModal, setShowModal] = useState(false);
const handleClick = () => {
  setShowModal(true);
};

function resetForm() {
  setShowModal(false)
  setNombre('');
  setApellido('');
  setTelefono('');
  setCI('');
  setContraseña('');
  setConfirmarContraseña('');
  setCorreoElectronico('');
}



const [nombre, setNombre] = useState('');
const [apellido, setApellido] = useState('');
const [telefono, setTelefono] = useState('');
const [CI, setCI] = useState('');
const [contraseña, setContraseña] = useState('');
const [confirmarContraseña, setConfirmarContraseña] = useState('');
const [correoElectronico, setCorreoElectronico] = useState('');

//subida imagen
const initialValues ={
  file:null,
  nombre: ''
}
const [archivo, setArchivo] = useState(initialValues);
//fin subida imagen


  const onSubmit = async (event) => {
    event.preventDefault();

    // await axios.post(Usuario_Api_Url, {
    //   nombre: nombre,
    //   apellido: apellido,
    //   dni: CI,
    //   telefono: telefono,
    //   email: correoElectronico,
    //   password: contraseña,
    //   password_confirmed: confirmarContraseña,
    //   tipo_usuario: 3
    // })

    const fd = new FormData();
    fd.append('file', archivo.file);
    await axios.post(Imagen_Api_Url, fd)
    .then(response=>{ 
      var urli= response.data.urlimagen;
      axios.post(Usuario_Api_Url, {
        nombre: nombre,
        apellido: urli,
        dni: CI,
        telefono: telefono,
        email: correoElectronico,
        password: contraseña,
        password_confirmed: confirmarContraseña,
        tipo_usuario: 0
      })
    })

    resetForm();
  };

  return (
    <div style={{color: '#EAF1F7', backgroundColor:"#EAF1F7"}} className="d-flex flex-column justify-content-center align-items-center" >
      <h1 style={{marginTop: "30px"}} >Registrar cuenta </h1>
      <Row className="justify-content-md-center">
        <Col md={6}>
    <Form onSubmit={onSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            pattern= "[a-zA-Z ]*$"
            maxLength={30}
            minLength={2}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="apellido">
          <Form.Label>Apellido:</Form.Label>
          <Form.Control
            type="text"
            value={apellido}
            onChange={(event) => setApellido(event.target.value)}
            pattern="[a-zA-Z ]+"
            maxLength={30}
            minLength={2}
            required
          />
        </Form.Group>

        <Form.Group controlId="telefono">
          <Form.Label>Celular:</Form.Label>
          <Form.Control
            type="tel"
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
            pattern="[0-9]+"
            maxLength={8}
            minLength={2}
            required
          />
        </Form.Group>
              
        <Form.Group controlId="CI">
          <Form.Label>CI/DNI:</Form.Label>
          <Form.Control
            type="t"
            value={CI}
            onChange={(event) => setCI(event.target.value)}
            pattern="[0-9]+"
            maxLength={10}
            minLength={6}
            required
          />
        </Form.Group>

        <Button onClick={handleClick}  variant="danger" >Cancelar </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmar acción</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>¿Estás seguro de cancelar el registro?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      No
                    </Button>
                    <Button variant="primary" onClick={ resetForm} > 
                      Si
                    </Button>
                  </Modal.Footer>
            </Modal>

    </Form>
    </Col>
        <Col md={6}>
        <Form onSubmit={onSubmit}>

        <Form.Group controlId="contraseña">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
              type="password"
              value={contraseña}
              onChange={(event) => setContraseña(event.target.value)}
              minLength={8}
              required
          />
        </Form.Group>

        <Form.Group controlId="confirmar-contraseña">
          <Form.Label>Confirmar contraseña:</Form.Label>
          <Form.Control
            type="password"
            value={confirmarContraseña}
            onChange={(event) => setConfirmarContraseña(event.target.value)}
            minLength={8}
            required
          />
        </Form.Group>

        <Form.Group controlId="correo-electronico">
          <Form.Label>Correo electrónico:</Form.Label>
          <Form.Control
            type="email"
            value={correoElectronico}
            maxLength={60}
            minLength={10}
            onChange={(event) => setCorreoElectronico(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="foto">
          <Form.Label>Foto del Vehiculo </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={e=> setArchivo({file: e.target.files[0]})}
            required
          />
        </Form.Group>
         
<Button variant="success" type="submit">Enviar</Button>
</Form>
</Col>
       </Row>
       </div>
 );
};

export default FormularioRegistroUsuario;