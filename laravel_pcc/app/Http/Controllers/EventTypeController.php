<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventType;

class EventTypeController extends Controller
{

    public function get(){

        $event_types = EventType::all();
        return response()->json([
            'status' => 200,
            'events' => $event_types,
        ]);

    }

    public function store(Request $request){

        $tipo_evento = new EventType();

        $tipo_evento-> nombre_tipo_evento = $request -> nombre_tipo_evento;

        $tipo_evento -> save();

        return response()->json([
            'status' => 200,
            'message' => 'Tipo de evento añadido exitosamente',
        ]);
    }
}
