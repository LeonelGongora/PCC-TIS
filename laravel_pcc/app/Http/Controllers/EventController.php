<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{

    public function get(){

        $events = Event::all();
        return response()->json([
            'status' => 200,
            'events' => $events,
        ]);
    }

    public function getNo($id){

       $eventosNoInscritos = Event::whereDoesntHave('users', function ($query) use ($id) {
        $query->where('user_id', $id);
       })->get();
        return response()->json([
            'status' => 200,
            'message' =>'Eventos No Inscritos correctamente',
            'events' => $eventosNoInscritos
        ]);
    }

    public function store(Request $request){
        $evento = new Event();

        $evento-> nombre_evento = $request -> nombre_evento;
        $evento-> fecha_inicio = $request -> fecha_inicio;
        $evento-> numero_contacto = $request -> numero_contacto;
        $evento-> descripcion = $request -> descripcion;
        $evento-> fecha_fin = $request -> fecha_fin;
        $evento-> participantes_equipo = $request -> participantes_equipo;
        $evento-> event_type_id = $request -> event_type_id;
        
        if($request -> hasFile ('image')){
            $image = $request->file('image');
            $name = time().'.'.$image->getClientOriginalExtension();
            $image->move('images/', $name);

            
            $evento-> name = $name;
            $evento-> save();
            $evento->id;

            return response()->json([
                'status' => 200,
                'message' =>'Evento añadido exitosamente',
                'ultimo_id_evento' => $evento->id,
            ]);

        }else{
            $evento-> save();
            $evento->id;
            return response()->json([
                'status' => 200,
                'message' => 'No hay archivo, pero se añadio el evento',
                'ultimo_id_evento' => $evento->id,
            ]);
        }

    }

    public function misEventos($id){

        $events = DB::table('events')
        ->join('evento_user', 'events.id', '=', 'evento_user.event_id')
        ->join('users', 'users.id', '=', 'evento_user.user_id')
        ->join('event_types', 'event_types.id', '=', 'events.event_type_id')
        // ->where('evento_user.solicitud', 0)
        // ->orWhere('evento_user.solicitud', 1)
        ->where(function($q) {
            $q->where('evento_user.solicitud', 0)
            ->orWhere('evento_user.solicitud', 1);
        })
        ->where('users.id', $id)
        ->select('events.*', 'event_types.nombre_tipo_evento', 'evento_user.id as euid')
        ->get();

        return response()->json([
            'status' => 200,
            'events' => $events,

        ]);
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
        $seCargoArchivo = $request -> seCargoArchivo;

        if($seCargoArchivo == 0){

            $evento-> nombre_evento = $request -> nombre_evento;
            $evento-> fecha_inicio = $request -> fecha_inicio;
            $evento-> numero_contacto = $request -> numero_contacto;
            $evento-> descripcion = $request -> descripcion;
            $evento-> fecha_fin = $request -> fecha_fin;
            $evento-> participantes_equipo = $request -> participantes_equipo;
            $evento-> event_type_id = $request -> event_type_id;
            $evento-> update();

            return response()->json([
                'status' => 200,
                'message' =>'No se cargo una nueva imagen']);
        }else{
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $name = time().'.'.$image->getClientOriginalExtension();
                $image->move('images/', $name);

                $evento-> nombre_evento = $request -> nombre_evento;
                $evento-> fecha_inicio = $request -> fecha_inicio;
                $evento-> numero_contacto = $request -> numero_contacto;
                $evento-> descripcion = $request -> descripcion;
                $evento-> fecha_fin = $request -> fecha_fin;
                $evento-> participantes_equipo = $request -> participantes_equipo;
                $evento-> event_type_id = $request -> event_type_id;
                $evento-> name = $name;
                $evento-> update();

                return response()->json([
                    'status' => 200,
                    'message' =>'Se cargo una nueva imagen']);

            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'No hay archivo',
                ]);
            }
        }
    }

    public function getByDate($fecha)
    {
        //$eventos = Event::where('created_at', '>', '2023-01-01 00:00:00')->get();
        $eventos = Event::whereBetween('created_at', ['2023-01-01 00:00:00', '2023-12-31 23:59:59'])->get();
        return response()->json([
            'status' => 200,
            'message' => 'No hay archivo',
            'eventos' => $eventos
        ]);
    }

    public function destroy($id)
    {
        $evento=Event::find($id);
        $evento->delete();
    }
}
