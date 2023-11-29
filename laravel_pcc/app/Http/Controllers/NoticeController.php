<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notice;

class NoticeController extends Controller
{
    public function store(Request $request){

        $anuncio = new Notice();

        $anuncio-> contenido_anuncio = $request -> contenido_anuncio;

        $anuncio -> save();

        return response()->json([
            'status' => 200,
            'message' => 'Anuncio añadido exitosamente',
        ]);
    }

    public function get(){

        $anuncios = Notice::all();
        return response()->json([
            'status' => 200,
            'message' => 'Anuncios obtenidos exitosamente',
            'anuncios' => $anuncios,
        ]);
    }
}
