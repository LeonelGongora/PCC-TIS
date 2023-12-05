import React, { useState } from 'react';
import '../../stylesheets/InfoEventStyles.css'; // Asegúrate de tener un archivo styles.css con el contenido de estilos proporcionado en la respuesta anterior.

const ImagenAmpliable = ({ src, alt }) => {
  const [ampliada, setAmpliada] = useState(false);

  const toggleAmpliada = () => {
    setAmpliada(!ampliada);
  };

  return (
    <div className={`imagen-container ${ampliada ? 'imagen-ampliada' : ''}`} onClick={toggleAmpliada}>
      {ampliada && <div className="fondo"></div>}
      <img src={src} alt={alt} className="imagen" />
    </div>
  );
};

export default ImagenAmpliable;