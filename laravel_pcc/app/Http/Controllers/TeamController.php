<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;

class TeamController extends Controller
{
    public function store(Request $request){

        $equipo = new Team();

        $equipo-> nombre_equipo = $request -> nombre_equipo;
        $equipo-> event_id = $request -> event_id;
        $equipo-> solicitud = $request -> solicitud;

        $equipo -> save();
        $equipo->id;

        return response()->json([
            'status' => 200,
            'message' => 'Equipo añadido exitosamente',
            'ultimo_id_equipo' => $equipo->id
        ]);
    }

    public function getTeams0($event_id){

        return Team::where('event_id', $event_id)->where('solicitud', 0)->get();

    }

    public function getTeams1($event_id){

        return Team::where('event_id', $event_id)->where('solicitud', 1)->get();

    }

}
