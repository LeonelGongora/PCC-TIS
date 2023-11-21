<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team_User;
class Team_UserController extends Controller
{
    public function store(Request $request){
        $equipo_usuario = new Team_User();
        $equipo_usuario -> team_id = $request -> team_id;
        $equipo_usuario -> user_id = $request -> user_id;
        $equipo_usuario->save();

        return response()->json([
            'status' => 200,
            'message' =>'Equipo_Usuario añadido exitosamente']);
    }
}
