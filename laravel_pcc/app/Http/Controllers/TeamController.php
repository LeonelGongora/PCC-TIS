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

    public function getPorEvento($id){

        $team = Team::where('teams.solicitud', 0)
        ->where('teams.event_id', $id)
        ->join('users', 'users.id', '=', 'teams.id_coach')
        ->select('teams.*', 'users.nombre as nombreCoach', 'users.apellido as apellidoCoach')
        ->get();

        return response()->json([
            'status' => 200,
            'message' => 'Usuarios obtenidos exitosamente',
            'teams' => $team,

        ]);
    }

    public function index()
    {
        return Team::all();
    }

    public function update(Request $request, $id)
    {
        $team = Team::find($id);
        if(!is_null($team)){
        $team->update($request->all());
        return $team;
       }  
    }
}
