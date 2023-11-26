<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function store(Request $request){

        $equipo = new Team();

        $equipo-> nombre_equipo = $request -> nombre_equipo;
        $equipo-> event_id = $request -> event_id;
        $equipo-> solicitud = $request -> solicitud;
        $equipo-> id_coach = $request -> id_coach;
        $equipo-> zip = $request -> zip;

        $equipo -> save();
        $equipo->id;

        return response()->json([
            'status' => 200,
            'message' => 'Equipo añadido exitosamente',
            'ultimo_id_equipo' => $equipo->id
        ]);
    }
}
