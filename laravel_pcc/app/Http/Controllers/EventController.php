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
        if($request -> has ('image')){

            $nombre_evento = $request -> nombre_evento;
            $requisitos = $request -> requisitos;
            $fecha_inicio = $request -> fecha_inicio;
            $numero_contacto = $request -> numero_contacto;
            $descripcion = $request -> descripcion;
            $fecha_limite = $request -> fecha_limite;
            $fecha_fin = $request -> fecha_fin;
            $participantes_equipo = $request -> participantes_equipo;
            $event_type_id = $request -> event_type_id;

            $image = $request->file('image');

            $name = time().'.'.$image->getClientOriginalExtension();
            $image->move('images/', $name);

            Event::create(['nombre_evento' => $nombre_evento,
            'requisitos' => $requisitos,
            'fecha_inicio' => $fecha_inicio,
            'numero_contacto' => $numero_contacto,
            'descripcion' => $descripcion,
            'fecha_limite' => $fecha_limite,
            'fecha_fin' => $fecha_fin,
            'participantes_equipo' => $participantes_equipo,
            'name' => $name,
            'event_type_id' => $event_type_id]);

            return response()->json(['success' => 'Uploaded successfully']);

        }
        return response()->json(['plz try again']);

    }

    public function show($id)
    {
        return Event::find($id);
    }

    public function index()
    {
        return Event::all();
    }

    public function update(Request $request, $id)
    {
        $evento = Event::find($id);
        if(!is_null($evento)){
        $evento->update($request->all());
        return $evento;
       }  
    }

    public function destroy($id)
    {
        $evento=Event::find($id);
        $evento->delete();
    }
}
