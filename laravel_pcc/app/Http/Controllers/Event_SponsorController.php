<?php

namespace App\Http\Controllers;

use App\Models\Event_Sponsor;
use Illuminate\Http\Request;
use App\Models\Event;

class Event_SponsorController extends Controller
{
    public function store(Request $request)
    {
        $evento_patrocinador = new Event_Sponsor();
        $evento_patrocinador -> event_id = $request -> evento;
        $evento_patrocinador -> sponsor_id = $request -> patrocinador;
        $evento_patrocinador->save();

        return response()->json([
            'status' => 200,
            'message' =>'Evento-Patrocinador añadido exitosamente']);
    }

    public function destroy(Request $request)
    {
        $evento_id = $request -> evento;
        $patrocinador_id = $request -> patrocinador;

        $evento = Event::find($evento_id);
        $evento->sponsors()->detach($patrocinador_id);

        return response()->json([
            'status' => 200,
            'message' =>'Evento-patrocinador eliminado exitosamente']);
    }
}
