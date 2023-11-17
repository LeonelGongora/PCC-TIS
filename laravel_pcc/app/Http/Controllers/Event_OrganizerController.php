<?php

namespace App\Http\Controllers;

use App\Models\Event_Organizer;
use Illuminate\Http\Request;
use App\Models\Event;

class Event_OrganizerController extends Controller
{
    public function store(Request $request)
    {
        $evento_organizador = new Event_Organizer();
        $evento_organizador -> event_id = $request -> evento;
        $evento_organizador -> organizer_id = $request -> organizador;
        $evento_organizador->save();

        return response()->json([
            'status' => 200,
            'message' =>'Evento-Organizador añadido exitosamente']);
    }

    public function destroy(Request $request)
    {
        $evento_id = $request -> evento;
        $organizador_id = $request -> organizador;

        $evento = Event::find($evento_id);
        $evento->organizers()->detach($organizador_id);

        return response()->json([
            'status' => 200,
            'message' =>'Evento-organizador eliminado exitosamente']);
    }

}
