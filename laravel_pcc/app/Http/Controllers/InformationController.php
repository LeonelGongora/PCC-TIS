<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Information;

class InformationController extends Controller
{
    public function store(Request $request){

        $informacion = new Information();
        $informacion-> nombre_informacion = $request -> nombre_informacion;
        $informacion-> contenido_informacion = $request -> contenido_informacion;
        $informacion-> event_id = $request -> event_id;

        $informacion -> save();

        return response()->json([
            'status' => 200,
            'message' => 'Informacion añadida exitosamente',
        ]);
    }

}
