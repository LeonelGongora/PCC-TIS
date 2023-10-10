<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{

    public function get(){

        $events = Event::all();
        return response()->json([
            'status' => 200,
            'events' => $events,

        ]);

    }


    public function store(Request $request){

        $evento = new Event();

        $evento -> nombre_evento = $request -> nombre_evento;
        $evento -> requisitos = $request -> requisitos;
        $evento -> fecha_inicio = $request -> fecha_inicio;
        $evento -> numero_contacto = $request -> numero_contacto;
        $evento -> descripcion = $request -> descripcion;
        $evento -> fecha_limite = $request -> fecha_limite;
        $evento -> fecha_fin = $request -> fecha_fin;
        $evento -> participantes_equipo = $request -> participantes_equipo;
        $evento -> event_type_id = $request -> event_type_id;

        $evento -> save();

        return response()->json([
            'status' => 200,
            'message' => 'Evento añadido exitosamente',
        ]);

    }
}
