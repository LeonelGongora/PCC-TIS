import React from 'react';
import styled from 'styled-components';


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