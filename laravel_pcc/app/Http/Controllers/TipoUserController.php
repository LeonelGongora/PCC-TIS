<?php

namespace App\Http\Controllers;

use App\Models\Tipo_User;
use Illuminate\Http\Request;

class TipoUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Tipo_User::all();
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
        $tipo_User = new Tipo_User($request->all());
        $tipo_User->save();
        return $tipo_User;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tipo_User  $tipo_User
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Tipo_User::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tipo_User  $tipo_User
     * @return \Illuminate\Http\Response
     */
    public function edit(Tipo_User $tipo_User)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tipo_User  $tipo_User
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $tipo_User = Tipo_User::find($id);
        if(!is_null($tipo_User)){
        $tipo_User->update($request->all());
        return $tipo_User;
       }  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tipo_User  $tipo_User
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tipo_User=Tipo_User::find($id);
        $tipo_User->delete();
    }
}
