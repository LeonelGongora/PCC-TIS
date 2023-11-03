<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use Illuminate\Http\Request;

class AttributeController extends Controller
{
    public function store(Request $request){

        $atributo = new Attribute();

        $atributo-> nombre_atributo = $request -> nombre_atributo;
        $atributo-> event_id = $request -> event_id;

        $atributo -> save();

        return response()->json([
            'status' => 200,
            'message' => 'Atributo añadido exitosamente',
        ]);
    }
    
}
