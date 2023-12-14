import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel

} from '@tanstack/react-table'
import Cookies from 'universal-cookie';
import axios from 'axios'
import { URL_API } from '../const';

import { useState, useEffect } from 'react'
function Reportes(){

    useEffect(()=>{
        getEvent();
    }, [])

    const getEvent=async()=>{
        const url = `${URL_API}/events`;
        const response = await axios.get(url)
        if(response){
          console.log(response.data.events)
          setEventos(response.data.events)
        }
    }

    let id_evento_actual = 0
    let evento_actual = []

    const[eventos, setEventos] = useState([]);
    const[columnas, setColumnas] = useState([]);
    const[dataTabla, setDataTabla] = useState([]);
    const [errors, setErrors] = useState({});

    const columns = [
        {
            header: "ID",
            accessorKey: 'id',
        },
        {
            header: "Nombre",
            accessorKey: 'nombre_evento',
        },
        {
            header: "Fecha inicio",
            accessorKey: 'fecha_inicio',
        },
        {
            header: "Numero contacto",
            accessorKey: 'numero_contacto',
        },
        {
            header: "Descripcion",
            accessorKey: 'descripcion',
        },
        {
            header: "Participantes",
            accessorKey: 'participantes_equipo',
        },
    ]

    const cambioReporteGeneral = (e) => {
        if(e.target.value === "Eventos"){
            reporteEvento(e);
        }
        //console.log(e.target.value)
    }

    const reporteEvento = async (e) => {
        console.log(eventos)
        

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
        e.target.value = 'predeterminado'
    }

    const cambioEventoActual = (e) => {
        //if(e.target.value === "Eventos"){
            //reporteEvento();
        //}
        //setEventoActual(e.target.value)
        id_evento_actual = e.target.value
        for (let i = 0; i < eventos.length; i++) {
            if(eventos[i].id == id_evento_actual){
                evento_actual = eventos[i]
                break
            }
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
        }
    }

    

    const reporteParticipantes = (e) => {
        console.log(evento_actual.users)

        if (evento_actual.users.length === 0) {
            console.log("NULO")

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

            e.target.value = "predeterminado";

        }
    }

    const reporteOrganizadoresEvento = (e) => {
        console.log(evento_actual.organizers)

        if (evento_actual.organizers.length === 0) {
            console.log("NULO Organizadores")

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

            e.target.value = "predeterminado";

        }
    }

    const reportePatrocinadoresEvento = (e) => {
        if (evento_actual.sponsors.length === 0) {
            console.log("NULO Organizadores")
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

            e.target.value = "predeterminado";

        }
    }

    const reporteRequisitosEvento = (e) => {
        if (evento_actual.requirements.length === 0) {
            console.log("NULO Organizadores")
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

            e.target.value = "predeterminado";

        }
        
    }

    const reporteActividadesEvento = (e) => {
        if (evento_actual.activities.length === 0) {
            console.log("NULO Organizadores")
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

            e.target.value = "predeterminado";

        }
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
        <div> 
            <input
                type='text'
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}

            />

            <label>Opciones</label>

            <select name="lenguajes" onChange={cambioReporteGeneral}>
                <option value="predeterminado" disabled selected>
                    {" "}
                    Seleccione un tipo
                </option>
                <option value="Eventos">Eventos</option>
                <option value="Tipos de Evento" >Tipos de Evento</option>
            </select>
            
            <select onChange={cambioEventoActual}>
                  <option disabled selected>
                    {" "}
                    Seleccione un evento
                  </option>
                  {eventos.map((evento, id) => {
                    return <option value={evento.id}>{evento.nombre_evento}</option>;
                  })}
            </select>

            <select name="lenguajes" onChange={cambioReporteEspecifico} onfocus="this.selectedIndex = -1;">
                <option value="predeterminado" disabled selected>
                    {" "}
                    Seleccione un tipo de reporte
                </option>
                <option value="Participantes">Participantes</option>
                <option value="Organizadores_Evento" >Organizadores</option>
                <option value="Requisitos_Evento" >Requisitos</option>
                <option value="Actividades_Evento" >Actividades</option>

            </select>

            <table>
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
    )
}

export default  Reportes;