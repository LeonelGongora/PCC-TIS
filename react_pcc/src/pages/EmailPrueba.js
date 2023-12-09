import React, { useState } from 'react';
import axios from 'axios';

const EmailPrueba = () => {
  const [destinatario, setDestinatario] = useState('');
  const [contenido, setContenido] = useState('');

  const enviarCorreo = () => {
    axios.post('http://127.0.0.1:8000/api/enviar-correo', {
      destinatario: destinatario,
      contenido: contenido,
    })
    .then(response => {
      console.log(response.data.mensaje);
    })
    .catch(error => {
      console.error('Error al enviar el correo:', error);
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Destinatario"
        value={destinatario}
        onChange={(e) => setDestinatario(e.target.value)}
      />
      <textarea
        placeholder="Contenido del correo"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
      />
      <button onClick={enviarCorreo}>Enviar Correo</button>
    </div>
  );
};

export default EmailPrueba;
