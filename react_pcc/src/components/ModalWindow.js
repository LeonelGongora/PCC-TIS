import React from 'react';
import styled from 'styled-components';


<<<<<<< Updated upstream
function ModalWindow(){
    return (
        <>
            <Overlay>
                <ContenedorModal>
                    <EncabezadoModal>
                        <h1>jeje</h1>
                        <BotonSalir>X</BotonSalir>
                    </EncabezadoModal>

                </ContenedorModal>
            </Overlay>
        </>
    )

=======

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalWindow({estado1, cambiarEstado1}){

    
    const [values, setValues] = useState({
        nombre_tipo_evento : "",
    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const {name, value} = e.target;

        setValues({
            ...values,
            [name]:value,
        });
    }

    const saveTypeEvent = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(!values.nombre_tipo_evento.trim()){
            validationErrors.nombre_tipo_evento = "Este campo es obligatorio es requerido"

        }else if(!/^[A-Za-zÑñáéíóú][A-Za-zÑñáéíóú\s]{1,58}[A-Za-zÑñáéíóú]$/.test(values.nombre_tipo_evento)){
            validationErrors.nombre_tipo_evento = "Ingrese un nombre valido"
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
            const res = await axios.post('http://127.0.0.1:8000/api/add-event_type', values);
            if(res.data.status === 200){
                console.log(values.nombre_tipo_evento);
            }
        }

        
    }

    return (
        estado1 && (
            <div className="Overlay">
              <div className="ContenedorModal">
                <div className="EncabezadoModal">
                  <div className="tituloEvento">
                    <h1>Tipo de evento</h1>
                  </div>
                  <button
                    onClick={() => cambiarEstado1(false)}
                    className="BotonSalir"
                  >
                    {salir}
                  </button>
                </div>
                <div className="registroTipoEvento">
                    <form onSubmit={saveTypeEvent} id="form1">
                        <input
                        type="text"
                        name="nombre_tipo_evento"
                        className="inputEvento"
                        placeholder="Ingrese nombre"
                        onChange={handleInput}
                        />
                        </form>
                        {errors.nombre_tipo_evento && (
                <span className="span1Modal">{errors.nombre_tipo_evento}</span>
              )}
              <button form="form1" type="submit" className="BotonRegistrar">
                Registrar
              </button>
              </div>
              </div>
        </div>
        )
    );
>>>>>>> Stashed changes
}

export default ModalWindow; 


const BotonSalir = styled.div``; 

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContenedorModal = styled.div`
    width: 500px;
    min-heigth: 100px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
    padding: 20px;
`;
const EncabezadoModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid red;
`;