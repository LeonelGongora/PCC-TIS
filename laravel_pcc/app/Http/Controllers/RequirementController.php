<?php

namespace App\Http\Controllers;

use App\Models\Requirement;
use Illuminate\Http\Request;

class RequirementController extends Controller
{
    public function store(Request $request){

        $requisito = new Requirement();

        $requisito-> contenido_requisito = $request -> contenido_requisito;
        $requisito-> event_id = $request -> event_id;

        $requisito -> save();

        return response()->json([
            'status' => 200,
            'message' => 'Requisito añadido exitosamente',
        ]);
    }
}
