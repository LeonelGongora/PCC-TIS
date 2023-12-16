import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel

} from '@tanstack/react-table'
import axios from 'axios'
import { URL_API } from '../const';
import * as XLSX from 'xlsx';

import "../stylesheets/reportes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NavbarAdmin from '../components/NavBars/NavbarAdmin';
import { useState, useEffect } from 'react'
function Reportes(){

    useEffect(()=>{
        getEvent();
    }, [])
    const buscar = <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" style={{color: "#000000",}} />;

    const getEvent=async()=>{
        const url = `${URL_API}/events`;
        const response = await axios.get(url)
        if(response){
          console.log(response.data.events)
          setEventos(response.data.events)
        }
    }

    let id_evento_actual = 0
    //let evento_actual = []

    const[eventos, setEventos] = useState([]);
    const[columnas, setColumnas] = useState([]);
    const[dataTabla, setDataTabla] = useState([]);
    const[evento_actual, setEventoActual] = useState([]);
    const[cantidadRegistros, setCantidadRegistros] = useState({});


    const cambioReporteGeneral = (e) => {
        if(e.target.value === "Eventos"){
            reporteEvento(e);
        }else if(e.target.value === "Eventos"){

        }
    }

    const reporteEvento = async (e) => {

        if(eventos.length === 0){
            let columna = [{
                header: "Sin registros",
                accessorKey: 'Sin registros',
            }]
            let fila = [{"Sin registros": "No existen registros para este reporte"}]
        
            setDataTabla(fila);
            setColumnas(columna)
        }else{
            const keys = Object.keys(eventos[0]);
            console.log(keys)
            let claves = keys.slice(0,10);
        
            //const streetAddress = addy.substring(0, addy.indexOf(","));
            for (let i = 0; i < eventos.length; i++) {
                eventos[i].created_at= eventos[i].created_at.substring(0, eventos[i].created_at.indexOf("T"));
           }
           setDataTabla(eventos);

            let columnasActuales = []

          //string.charAt(0).toUpperCase();
        
            for (let i = 0; i < claves.length; i++) {
                let diccionario = {}
                diccionario["header"] = claves[i];
                diccionario["accessorKey"] = claves[i];
                columnasActuales.push(diccionario)
            }

            setColumnas(columnasActuales)
            setCantidadRegistros(dataTabla.length)
        }
        e.target.value = 'predeterminado'
    }

    const cambioEventoActual = (e) => {
        console.log(table.getState())
        id_evento_actual = e.target.value
        let evento_actual_aux = []
        for (let i = 0; i < eventos.length; i++) {
            if(eventos[i].id == id_evento_actual){
                setEventoActual(eventos[i]);
                evento_actual_aux = eventos[i]
                break
            }
        }
        const myElement = document.getElementById("opcionesEventoEspecifico");
        myElement.disabled = false;

        if(evento_actual_aux.participantes_equipo === 1){
            const myElement = document.getElementById("Participantes_Opcion");
            myElement.disabled = false;

            const myElement1 = document.getElementById("Equipos_Opcion");
            myElement1.disabled = true;

            
        }else if(evento_actual_aux.participantes_equipo > 1){
            const myElement = document.getElementById("Equipos_Opcion");
            myElement.disabled = false;

            const myElement1 = document.getElementById("Participantes_Opcion");
            myElement1.disabled = true;
        }
    }

    const cambioReporteEspecifico = (e) => {
        if(e.target.value === "Participantes"){
            reporteParticipantes(e);
        }else if(e.target.value === "Organizadores_Evento"){
            reporteOrganizadoresEvento(e);
        }else if(e.target.value === "Patrocinadores_Evento"){
            reportePatrocinadoresEvento(e);
        }else if(e.target.value === "Requisitos_Evento"){
            reporteRequisitosEvento(e);
        }else if(e.target.value === "Actividades_Evento"){
            reporteActividadesEvento(e);
        }else if(e.target.value === "Equipos_Evento"){
            reporteEquiposEvento(e);
        }
    }

    const reporteParticipantes = (e) => {
        console.log(evento_actual.users)

        if (evento_actual.users.length === 0) {
            let columna = [{
                header: "Sin registros",
                accessorKey: 'Sin registros',
            }]
            let fila = [{"Sin registros": "No existen registros para este reporte"}]
        
            setDataTabla(fila);
            setColumnas(columna)

        }else{
            const keys = Object.keys(evento_actual.users[0]);
            //let fecha_creacion = ""
            //fecha_creacion = keys[9];

            let claves = keys.slice(0, 8);
            console.log(claves);
            //claves.push()

            let columnasActuales = [];

            //string.charAt(0).toUpperCase();

            for (let i = 0; i < claves.length; i++) {
              let diccionario = {};
              diccionario["header"] = claves[i];
              diccionario["accessorKey"] = claves[i];
              columnasActuales.push(diccionario);
              //const element = array[i];
            }
            console.log(evento_actual.users);
            console.log(columnasActuales);

            setDataTabla(evento_actual.users);
            setColumnas(columnasActuales);
            setCantidadRegistros(dataTabla.length)
        }
        e.target.value = "predeterminado";
    }

    const reporteOrganizadoresEvento = (e) => {

        if (evento_actual.organizers.length === 0) {
            console.log("Sin organizadores")
            let columna = [{
                header: "Sin registros",
                accessorKey: 'Sin registros',
            }]
            let fila = [{"Sin registros": "No existen registros para este reporte"}]

            setDataTabla(fila);
            setColumnas(columna)
        }else{

            const keys = Object.keys(evento_actual.organizers[0]);
            //let fecha_creacion = ""
            //fecha_creacion = keys[9];

            keys.splice(2, 1);

            let claves = keys.slice(1, 2);
            console.log(claves);
            //claves.push()

            let columnasActuales = [];

            //string.charAt(0).toUpperCase();

            for (let i = 0; i < claves.length; i++) {
              let diccionario = {};
              diccionario["header"] = claves[i];
              diccionario["accessorKey"] = claves[i];
              columnasActuales.push(diccionario);
              //const element = array[i];
            }
            setDataTabla(evento_actual.organizers);
            setColumnas(columnasActuales);
            setCantidadRegistros(dataTabla.length)
        }
        e.target.value = "predeterminado";
    }

    const reportePatrocinadoresEvento = (e) => {
        console.log(evento_actual)
        if (evento_actual.sponsors.length === 0) {
            console.log("NULO patrocinadores")
            let columna = [{
                header: "Sin registros",
                accessorKey: 'Sin registros',
            }]
            let fila = [{"Sin registros": "No existen registros para este reporte"}]

            setDataTabla(fila);
            setColumnas(columna)
        }else{

            const keys = Object.keys(evento_actual.sponsors[0]);
            //let fecha_creacion = ""
            //fecha_creacion = keys[9];

            let claves = keys.slice(1, 2);
            console.log(claves);
            //claves.push()

            let columnasActuales = [];

            //string.charAt(0).toUpperCase();

            for (let i = 0; i < claves.length; i++) {
              let diccionario = {};
              diccionario["header"] = claves[i];
              diccionario["accessorKey"] = claves[i];
              columnasActuales.push(diccionario);
              //const element = array[i];
            }

            setDataTabla(evento_actual.sponsors);
            setColumnas(columnasActuales);
            setCantidadRegistros(dataTabla.length)
        }
        e.target.value = "predeterminado";
    }

    const reporteRequisitosEvento = (e) => {
        console.log(evento_actual)
        if (evento_actual.requirements.length === 0) {
            console.log("NULO Organizadores")
            let columna = [{
                header: "Sin registros",
                accessorKey: 'Sin registros',
            }]
            let fila = [{"Sin registros": "No existen registros para este reporte"}]

            setDataTabla(fila);
            setColumnas(columna)
        }else{
            const keys = Object.keys(evento_actual.requirements[0]);
            //let fecha_creacion = ""
            //fecha_creacion = keys[9];

            let claves = keys.slice(1, 2);
            console.log(claves);
            //claves.push()

            let columnasActuales = [];

            //string.charAt(0).toUpperCase();

            for (let i = 0; i < claves.length; i++) {
              let diccionario = {};
              diccionario["header"] = claves[i];
              diccionario["accessorKey"] = claves[i];
              columnasActuales.push(diccionario);
              //const element = array[i];
            }

            setDataTabla(evento_actual.requirements);
            setColumnas(columnasActuales);
            setCantidadRegistros(dataTabla.length)
        }
        e.target.value = "predeterminado";
        
    }

    const reporteActividadesEvento = (e) => {
        if (evento_actual.activities.length === 0) {
            console.log("NULO Organizadores")
            let columna = [{
                header: "Sin registros",
                accessorKey: 'Sin registros',
            }]
            let fila = [{"Sin registros": "No existen registros para este reporte"}]

            setDataTabla(fila);
            setColumnas(columna)
        }else{

            const keys = Object.keys(evento_actual.activities[0]);
            //let fecha_creacion = ""
            //fecha_creacion = keys[9];

            let claves = keys.slice(1, 5);
            console.log(claves);
            //claves.push()

            let columnasActuales = [];

            //string.charAt(0).toUpperCase();

            for (let i = 0; i < claves.length; i++) {
              let diccionario = {};
              diccionario["header"] = claves[i];
              diccionario["accessorKey"] = claves[i];
              columnasActuales.push(diccionario);
              //const element = array[i];
            }

            setDataTabla(evento_actual.activities);
            setColumnas(columnasActuales);
            setCantidadRegistros(dataTabla.length)
        }
        e.target.value = "predeterminado";
    }

    const reporteEquiposEvento = (e) => {
        if (evento_actual.teams.length === 0) {
            console.log("NULO Equipos")
            let columna = [{
                header: "Sin registros",
                accessorKey: 'Sin registros',
            }]
            let fila = [{"Sin registros": "No existen registros para este reporte"}]

            setDataTabla(fila);
            setColumnas(columna)
        }else{

            const keys = Object.keys(evento_actual.activities[0]);
            //let fecha_creacion = ""
            //fecha_creacion = keys[9];

            let claves = keys.slice(1, 5);
            console.log(claves);
            //claves.push()

            let columnasActuales = [];

            //string.charAt(0).toUpperCase();

            for (let i = 0; i < claves.length; i++) {
              let diccionario = {};
              diccionario["header"] = claves[i];
              diccionario["accessorKey"] = claves[i];
              columnasActuales.push(diccionario);
              //const element = array[i];
            }

            setDataTabla(evento_actual.activities);
            setColumnas(columnasActuales);
            setCantidadRegistros(dataTabla.length)
        }
        e.target.value = "predeterminado";
    }

    const[sorting, setSorting] = useState([]);
    const[filtering, setFiltering] = useState("");

    const table = useReactTable({ data: dataTabla, columns: columnas, getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel : getFilteredRowModel(),
    state:{
        sorting,
        globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
    });

    return(
        <div className='contenidoReport'>
            <div className="background-image"></div>
        <div className='contenedorReport'>
        <NavbarAdmin/>
        <h1 className='tituloReport'>Reportes</h1>
        <div className='contenedorReportes'> 
        
            <div className='busqueda'>
            <input
                type='text'
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                placeholder='Buscar evento por nombre o descripcion'
            />
            <span id="botonBuscar-admin">{buscar}</span>
            </div>
            
            <p className='opciones'>Opciones</p>
            <div className='opcionesReportes'>
            <select name="lenguajes" onChange={cambioReporteGeneral}>
                <option value="predeterminado" disabled selected>
                    {" "}
                    Seleccione un tipo
                </option>
                <option value="Eventos">Eventos</option>
                <option value="Tipos de Evento" >Tipos de Evento</option>
            </select>
            
            <select onChange={cambioEventoActual}>
                  <option value="predeterminado"  disabled selected>
                    {" "}
                    Seleccione un evento
                  </option>
                  {eventos.map((evento, id) => {
                    return <option value={evento.id}>{evento.nombre_evento}</option>;
                  })}
            </select>

            <select name="lenguajes" onChange={cambioReporteEspecifico} onfocus="this.selectedIndex = -1;" disabled
            id='opcionesEventoEspecifico'>
                <option value="predeterminado" disabled selected>
                    {" "}
                    Seleccione un tipo de reporte
                </option>
                <option value="Participantes" id='Participantes_Opcion' disabled>Participantes</option>
                <option value="Equipos_Evento" id='Equipos_Opcion' disabled>Equipos</option>
                <option value="Organizadores_Evento" >Organizadores</option>
                <option value="Patrocinadores_Evento" >Patrocinadores</option>
                <option value="Requisitos_Evento" >Requisitos</option>
                <option value="Actividades_Evento" >Actividades</option>

            </select>
            </div>
            <table className='tablaReportes'>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => ( 
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                        <th key={header.id}
                                            onClick={header.column.getToggleGroupingHandler()}
                                        >
                                            {header.isPlaceholder ? null : ( 
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                            )}

                                            {
                                                {asc: "⬆️", desc : "⬇️" }[
                                                    header.column.getIsSorted() ?? null
                                                ]
                                            }
                                            
                                            </div>
                                        )}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }

                </thead>

                <tbody>
                    {
                        table.getRowModel().rows.map((row) => ( 
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }


                </tbody>

                <tfoot>
                </tfoot>
            </table>


            {/*
            {cantidadRegistros > 2 ? (
                <div className='paginas'>
                <button onClick={() => table.setPageIndex(0)}>
                    Primera Pagina
                </button>
                <button  onClick={() => table.previousPage()}>
                    Pagina anterior 
                </button>
                <button  onClick={() => table.nextPage()}>
                    Pagina siguiente
                </button>
                <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                    Ultima Pagina
                </button>
            </div>

            ):(
                    <div>
                    </div>
            )}

             */}
            <div className='paginas'>
                <button onClick={() => {
                    const datas = dataTabla?.length ? dataTabla : [];
                    const worksheet = XLSX.utils.json_to_sheet(datas);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook,worksheet, "Sheet1");
                    XLSX.writeFile(workbook, "data.xlsx")
                }}>
                    Descargar
                </button>
            </div>
            
            
        </div>
        </div>
        </div>
    )
}

export default  Reportes;