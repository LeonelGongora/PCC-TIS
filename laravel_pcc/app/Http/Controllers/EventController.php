<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        
        if($request -> hasFile ('image')){

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

            return response()->json([
                'status' => 200,
                'message' =>'Evento añadido exitosamente']);

        }else{
            return response()->json([
                'status' => 200,
                'message' => 'No hay archivo',
            ]);

        }

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

        if ($request->hasFile('image')) {

            $image = $request->file('image');
            $name = time().'.'.$image->getClientOriginalExtension();
            $image->move('images/', $name);

            $evento-> nombre_evento = $request -> nombre_evento;
            $evento-> requisitos = $request -> requisitos;
            $evento-> fecha_inicio = $request -> fecha_inicio;
            $evento-> numero_contacto = $request -> numero_contacto;
            $evento-> descripcion = $request -> descripcion;
            $evento-> fecha_limite = $request -> fecha_limite;
            $evento-> fecha_fin = $request -> fecha_fin;
            $evento-> participantes_equipo = $request -> participantes_equipo;
            $evento-> event_type_id = $request -> event_type_id;
            $evento-> name = $name;
            $evento-> update();

            return response()->json([
                'status' => 200,
                'message' =>'Evento editado exitosamente']);
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'No hay archivo',
            ]);

        }
      
    }

    public function destroy($id)
    {
        $evento=Event::find($id);
        $evento->delete();
    }
}
