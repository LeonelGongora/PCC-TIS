<?php

namespace App\Http\Controllers;

use App\Models\Organizer;
use Illuminate\Http\Request;

class OrganizerController extends Controller
{
    public function store(Request $request){

        if($request -> hasFile ('imagen_organizador')){

            $image = $request->file('imagen_organizador');
            $name = time().'.'.$image->getClientOriginalExtension();
            $image->move('imagenesOrganizadores/', $name);

            $organizador = new Organizer();

            $organizador-> nombre_organizador = $request -> nombre_organizador;
            $organizador-> imagen_organizador = $name;


            $organizador -> save();

            return response()->json([
                'status' => 200,
                'message' => 'Organizador añadido exitosamente',
            ]);
            
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'No hay archivo',
            ]);

        }

    }
}
