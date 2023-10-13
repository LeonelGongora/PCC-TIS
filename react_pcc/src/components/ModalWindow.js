import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const salir = <FontAwesomeIcon icon={faCircleXmark} />

function ModalWindow(){
    return (
        <>
            <Overlay>
                <ContenedorModal>
                    <EncabezadoModal>
                        <h1>Tipo de evento</h1>
                        <BotonSalir>{salir}</BotonSalir>
                    </EncabezadoModal>
                    
                </ContenedorModal>
            </Overlay>
        </>
    )

}

export default ModalWindow; 


const BotonSalir = styled.div`
    color: white;
    font-size: larger;
`; 

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
`;

const ContenedorModal = styled.div`
    width: 400px;
    min-height: 300px;
    background: white;
    position: relative;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
    border-radius: 8px;
`;
const EncabezadoModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(20,54,92);
    padding: 15px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: white;
    font-size: small;
`;
const