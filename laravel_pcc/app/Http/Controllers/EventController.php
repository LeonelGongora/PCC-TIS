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

    public function upload(Request $request){
        //if($request -> has ('image')){
           // $image = $request->file('image');

            //$name = time().'.'.$image->getClientOriginalExtension();
            //$image->move('images/', $name);

            //Image::create(['name' => $name]);

            //return response()->json(['success' => 'Uploaded successfully']);

        //}
        //return response()->json(['plz try again']);

    }
    /*
    public function store(Request $request){
        if($request -> has ('image')){

            $evento = new Event();

            $image = $request->file('image');
            $name = time().'.'.$image->getClientOriginalExtension();
            $image->move('images/', $name);



            $evento -> nombre_evento = $request -> nombre_evento;
            $evento -> requisitos = $request -> requisitos;
            $evento -> fecha_inicio = $request -> fecha_inicio;
            $evento -> numero_contacto = $request -> numero_contacto;
            $evento -> descripcion = $request -> descripcion;
            $evento -> fecha_limite = $request -> fecha_limite;
            $evento -> fecha_fin = $request -> fecha_fin;
            $evento -> participantes_equipo = $request -> participantes_equipo;
            $evento -> event_type_id = $request -> event_type_id;
            $evento -> name = $name;

            $evento -> save();

            return response()->json([
                'status' => 200,
                'message' => 'Evento añadido exitosamente',
                'success' => 'Uploaded successfully'

            ]);

        }
        return response()->json(['plz try again']);

        

        

    }


    */

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
}
