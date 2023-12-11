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
        const url = "http://127.0.0.1:8000/api/events"
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
        const url = "http://127.0.0.1:8000/api/events"
        const response = await axios.get(url)
        if(response){
          console.log(response.data.events)
          setDataTabla(response.data.events)
          const keys = Object.keys(response.data.events[0]);
          //let fecha_creacion = ""
          //fecha_creacion = keys[9];

          let claves = keys.slice(0,7);
          //claves.push()

          let columnasActuales = []

          //string.charAt(0).toUpperCase();
        
          for (let i = 0; i < claves.length; i++) {
            let diccionario = {}
            diccionario["header"] = claves[i];
            diccionario["accessorKey"] = claves[i];
            columnasActuales.push(diccionario)
            //const element = array[i];
          }

          setColumnas(columnasActuales)
          e.target.value = 'predeterminado'
        }
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
        }
    }

    const reporteParticipantes = (e) => {
        console.log(evento_actual.users)

        const keys = Object.keys(evento_actual.users[0]);
          //let fecha_creacion = ""
          //fecha_creacion = keys[9];

          let claves = keys.slice(0,8);
          console.log(claves)
          //claves.push()

          let columnasActuales = []

          //string.charAt(0).toUpperCase();
        
          for (let i = 0; i < claves.length; i++) {
            let diccionario = {}
            diccionario["header"] = claves[i];
            diccionario["accessorKey"] = claves[i];
            columnasActuales.push(diccionario)
            //const element = array[i];
          }
          console.log(evento_actual.users)
          console.log(columnasActuales)

          setDataTabla(evento_actual.users)
          setColumnas(columnasActuales)

          e.target.value = 'predeterminado'
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
            <div className="background-image"></div> {/* Componente de fondo */}
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
                <option value="Actividades" >Actividades</option>
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
        </div>
        </div>
        </div>
    )
}

export default  Reportes;