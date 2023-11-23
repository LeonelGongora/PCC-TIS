<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;

class ActivityController extends Controller
{

    public function store(Request $request){

        $actividad = new Activity();

        $actividad-> nombre_actividad = $request -> nombre_actividad;
        $actividad-> fecha_inicio_actividad = $request -> fecha_inicio_actividad;
        $actividad-> fecha_fin_actividad = $request -> fecha_fin_actividad;
        $actividad-> descripcion_actividad = $request -> descripcion_actividad;
        $actividad-> event_id = $request -> event_id;

        $actividad -> save();

        return response()->json([
            'status' => 200,
            'message' => 'Actividad añadida exitosamente',
        ]);
    }

    public function destroy($id)
    {
        $actividad = Activity::find($id);
        $actividad->delete();
        return response()->json([
            'status' => 200,
            'message' =>'Actividad eliminada exitosamente']);
    }
}
