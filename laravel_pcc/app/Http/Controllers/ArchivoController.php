<?php

namespace App\Http\Controllers;

use App\Models\Zona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\file;

class ArchivoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function upload(Request $request)
     {
        //$res = $request;
        if ( $request -> hasFile('file'))
        {
            $file = $request->file('file');
            $basic_url ='http://localhost:8000/';
            $destinationPath = 'imagen/';
            $filename = time() . '-' . $file->getClientOriginalName();
            $uploadSuccess = $request->file('file')->move($destinationPath, $filename);
            $url = $basic_url . $destinationPath . $filename;

            return response()->json([
                'messaje' => 'Imagen registrada exitosamente',
                'urlimagen' => $url 
            ], 201);
        }
        // return $url;
        // return response()->json(['urla' => $url], 200);
        // return response()->json([
        //     'urla' => $url
        // ], 201);

    }

    public function download(Request $request)
    {
        $url = $request->nombre;
        $path = storage_path($url);
        $filer= asset($url);
        // $path = storage_path($url);
        // return response()->download($path);
        return $filer;
    }
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}