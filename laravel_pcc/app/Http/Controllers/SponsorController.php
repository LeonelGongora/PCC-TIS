<?php

namespace App\Http\Controllers;

use App\Models\Sponsor;
use Illuminate\Http\Request;

class SponsorController extends Controller
{
    public function store(Request $request){

        if($request -> hasFile ('imagen_patrocinador')){

            $image = $request->file('imagen_patrocinador');
            $name = time().'.'.$image->getClientOriginalExtension();
            $image->move('imagenesPatrocinadores/', $name);

            $patrocinador = new Sponsor();

            $patrocinador-> nombre_patrocinador = $request -> nombre_patrocinador;
            $patrocinador-> imagen_patrocinador = $name;


            $patrocinador -> save();

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
