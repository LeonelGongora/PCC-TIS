import React, {useState, useEffect} from  'react';
import axios from 'axios';
import '../../stylesheets/ModalWindowStyle.css'
import '../../stylesheets/AtributosSeparadosStyles.css'
import configApi from '../../configApi/configApi';
import Cookies from 'universal-cookie';
import {URL_API} from '../../const';

const cookies = new Cookies();

function Patrocinadores({estadoPatrocinadores, cambiarEstadoPatrocinadores, patrocinadoresRegistrados}){

  const id = cookies.get('ultimo_id_evento');
  //const patrocinadores_agregar = cookies.get('patrocinadores_agregar');
  //const patrocinadores_eliminar = cookies.get('patrocinadores_eliminar');

  let mostrar_patrocinador = false;

  const [patrocinadores_agregar, setPatrocinadoresAgregar] = useState ( [] );
  const [patrocinadores_eliminar, setPatrocinadoresEliminar] = useState ( [] );

    const [patrocinadores, setPatrocinadores] = useState ( [] );

    const getPatrocinadores = async()=>{
        const url = `${URL_API}/get-patrocinador`;
        const respuesta = await axios.get(url);
        setPatrocinadores(respuesta.data.patrocinadores)
    }

    useEffect(()=>{
      getPatrocinadores();
    }, [])

    const registrarPatrocinadores = (e)=>{

      const url_Patrocinador_agregar = `${URL_API}/add-event_sponsor`; 
      const url_Patrocinador_eliminar = `${URL_API}/delete-event_sponsor`; 

      //console.log(patrocinadores_agregar)

      for (let index = 0; index < patrocinadores_eliminar.length; index++) {

        const data = new FormData()
        let patrocinador = patrocinadores_eliminar[index][0]
        let categoria = patrocinadores_eliminar[index][1]
        data.append("patrocinador", patrocinador)
        data.append("categoria", categoria)
        data.append("evento", id)

        axios.post(url_Patrocinador_eliminar, data).then(res => {
          if(res.data.status === 200){
            console.log(res);
          }
        })
      }

      for (let index = 0; index < patrocinadores_agregar.length; index++) {
        const data = new FormData()
        let patrocinador = patrocinadores_agregar[index][0]
        let categoria = patrocinadores_agregar[index][1]
        data.append("patrocinador", patrocinador)
        data.append("evento", id)
        data.append("categoria", categoria)
        

        axios.post(url_Patrocinador_agregar, data).then(res => {
          if(res.data.status === 200){
            console.log(res);
          }
        })
      }
      window.location.href = './paginaEditarEventos';
      
    }
    
    const actualizarGold = (e)=>{

      let patrocinadoresCheck = document.querySelectorAll('input[name="' + e.target.value + '"]');
      let listaPatrocinadores = Array.from(patrocinadoresCheck);

      if(listaPatrocinadores[1].checked === true || listaPatrocinadores[2].checked === true){
        listaPatrocinadores[1].checked = false;
        listaPatrocinadores[2].checked = false;
      }

      if(e.target.checked === true){
        listaPatrocinadores[1].disabled = true;
        listaPatrocinadores[2].disabled = true;
      }else{
        listaPatrocinadores[1].disabled = false;
        listaPatrocinadores[2].disabled = false;
      }

      actualizarSeleccionados(e);
    }

    const actualizarSilver = (e)=>{
      let patrocinadoresCheck = document.querySelectorAll('input[name="' + e.target.value + '"]');
      let listaPatrocinadores = Array.from(patrocinadoresCheck);

      if(listaPatrocinadores[0].checked === true || listaPatrocinadores[2].checked === true){
        listaPatrocinadores[0].checked = false;
        listaPatrocinadores[2].checked = false;
      }

      if(e.target.checked === true){
        listaPatrocinadores[0].disabled = true;
        listaPatrocinadores[2].disabled = true;
      }else{
        listaPatrocinadores[0].disabled = false;
        listaPatrocinadores[2].disabled = false;
      }

      actualizarSeleccionados(e);
    }

    const actualizarBronce = (e)=>{
      let patrocinadoresCheck = document.querySelectorAll('input[name="' + e.target.value + '"]');
      let listaPatrocinadores = Array.from(patrocinadoresCheck);

      if(listaPatrocinadores[0].checked === true || listaPatrocinadores[1].checked === true){
        listaPatrocinadores[0].checked = false;
        listaPatrocinadores[1].checked = false;
      }

      if(e.target.checked === true){
        listaPatrocinadores[0].disabled = true;
        listaPatrocinadores[1].disabled = true;
      }else{
        listaPatrocinadores[0].disabled = false;
        listaPatrocinadores[1].disabled = false;
      }

      actualizarSeleccionados(e);
      
    }

    const actualizarSeleccionados = (e)=>{

      let patrocinadores_id = [];

      let organizadoresSeleccionados = document.querySelectorAll('#checkBoxAddEvent');
      let arrayPatrocinadores = Array.from(organizadoresSeleccionados);

      for (let index = 0; index < arrayPatrocinadores.length; index++) {
          if(arrayPatrocinadores[index].checked === true){
            let categoriaArray = []
            categoriaArray.push(parseInt(arrayPatrocinadores[index].value))
            if(arrayPatrocinadores[index].className === "Gold"){
              categoriaArray.push("Gold")
            }else if(arrayPatrocinadores[index].className === "Silver"){
              categoriaArray.push("Silver")
            }else if(arrayPatrocinadores[index].className === "Bronce"){
              categoriaArray.push("Bronce")
            }
            patrocinadores_id.push(categoriaArray)
            //patrocinadores_id.push(parseInt(arrayPatrocinadores[index].value))
          }
      }

        
      let patrocinadores_id_registrados = [];

      for (let index = 0; index < patrocinadoresRegistrados.length; index++) {
        let categoriaArray = []
        categoriaArray.push(patrocinadoresRegistrados[index].id)
        categoriaArray.push(patrocinadoresRegistrados[index].pivot.categoria)
        patrocinadores_id_registrados.push(categoriaArray);
      }

      console.log("Registrados")
      console.log(patrocinadores_id_registrados)
      console.log("Seleccionados")
      console.log(patrocinadores_id)
      
      let patrocinadores_agregar = [];
      let patrocinadores_eliminar = [];

      for (let i = 0; i < patrocinadores_id.length; i++) {
        let estaPresente = patrocinadores_id_registrados.some(subArray => 
          subArray.every((value, index) => value === patrocinadores_id[i][index]))

        if(!estaPresente){
          patrocinadores_agregar.push(patrocinadores_id[i])
        }
      }
      
      for (let i = 0; i < patrocinadores_id_registrados.length; i++) {
        let estaPresente = patrocinadores_id.some(subArray => 
          subArray.every((value, index) => value === patrocinadores_id_registrados[i][index]))

          if(!estaPresente){
            patrocinadores_eliminar.push(patrocinadores_id_registrados[i])
          }
      }
  
      console.log("Agregar")
      console.log(patrocinadores_agregar)
      console.log("Eliminar")
      console.log(patrocinadores_eliminar)

      setPatrocinadoresAgregar(patrocinadores_agregar)
      setPatrocinadoresEliminar(patrocinadores_eliminar)

      cookies.set('patrocinadores_agregar', patrocinadores_agregar, { path: "/" });
      cookies.set('patrocinadores_eliminar', patrocinadores_eliminar, { path: "/" });
       
    }

    return (
        estadoPatrocinadores && (
          <>
        <div className='tituloCampos'>
            <h2>Patrocinadores</h2>
            <div className='seccionCampo patrocinadoresReg'>
                <h3>GOLD</h3>
                <div className='seccionesExtra extraOrganizador'>
                {patrocinadores.map((patrocinador) => {
                  mostrar_patrocinador = false;

                  for (let i = 0; i < patrocinadoresRegistrados.length; i++) {
                      if(patrocinador.id === patrocinadoresRegistrados[i].id){
                        if(patrocinadoresRegistrados[i].pivot.categoria === "Gold"){
                          mostrar_patrocinador = true;
                        }
                      }
                  }
                  patrocinador["valor"] = mostrar_patrocinador;

                  return (
                  <>
                    <div className="contCadaOrganizador">
                      <input
                        type="checkbox"
                        className="Gold"
                        id="checkBoxAddEvent"
                        name={patrocinador.id}
                        value={patrocinador.id}
                        defaultChecked = {patrocinador.valor}
                        onClick = {actualizarGold}
                      />
                      <span id="titCheck" className='nombreCheckOrg'>
                        {patrocinador.nombre_patrocinador}
                      </span>
                    </div>
                  </>
                  );
                })} 
                </div>

                <h3>SILVER</h3>
                <div className='seccionesExtra extraOrganizador'>
                {patrocinadores.map((patrocinador) => {    
                  mostrar_patrocinador = false;

                  for (let i = 0; i < patrocinadoresRegistrados.length; i++) {
                      if(patrocinador.id === patrocinadoresRegistrados[i].id){
                        if(patrocinadoresRegistrados[i].pivot.categoria === "Silver"){
                          mostrar_patrocinador = true;
                        }
                      }
                  }
                  patrocinador["valor"] = mostrar_patrocinador;

                  return (
                  <>
                    <div className="contCadaOrganizador">
                      <input
                        type="checkbox"
                        className="Silver"
                        id="checkBoxAddEvent"
                        name={patrocinador.id}
                        value={patrocinador.id}
                        defaultChecked = {patrocinador.valor}
                        onClick={actualizarSilver}
                      />
                      <span id="titCheck" className='nombreCheckOrg'>
                        {patrocinador.nombre_patrocinador} 
                      </span>
                    </div>
                  </>
                  );
                })} 
                  
                </div>
                <h3>BRONCE</h3>
                <div className='seccionesExtra extraOrganizador'>
                {patrocinadores.map((patrocinador) => {
                  mostrar_patrocinador = false;

                  for (let i = 0; i < patrocinadoresRegistrados.length; i++) {
                      if(patrocinador.id === patrocinadoresRegistrados[i].id){
                        if(patrocinadoresRegistrados[i].pivot.categoria === "Bronce"){
                          mostrar_patrocinador = true;
                        }
                      }
                  }
                  patrocinador["valor"] = mostrar_patrocinador;
                  return (
                  <>
                    <div className="contCadaOrganizador">
                      <input
                        type="checkbox"
                        className="Bronce"
                        id="checkBoxAddEvent"
                        name={patrocinador.id}
                        value={patrocinador.id}
                        defaultChecked = {patrocinador.valor}
                        onClick={actualizarBronce}
                      />
                      <span id="titCheck" className='nombreCheckOrg'>
                        {patrocinador.nombre_patrocinador}
                      </span>
                    </div>
                  </>
                  );
                })} 
                  
                </div>
            </div>
        </div>
        <div className='contBotonRegist'>
            <button className='botonesCambiar botonTerminarFix'
            onClick={registrarPatrocinadores}>
            Terminar Registro
            </button>
        </div>
        </>
        )

    );
}

export default Patrocinadores;