<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
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

    public function get(){

        $usuarios = User::all();
        return response()->json([
            'status' => 200,
            'message' => 'Usuarios obtenidos exitosamente',
            'usuarios' => $usuarios,

        ]);
    }

    public function store(Request $request)
    {


        $user = new User();
        $user-> nombre = $request -> nombre;
        $user-> apellido = $request -> apellido;
        $user-> ci = $request -> ci;
        $user-> telefono = $request -> telefono;
        $user-> email = $request -> email;
        $user-> password = $request -> password;

        $user -> save();
        $user->id;

        return response()->json([
            'status' => 200,
            'message' => 'Usuario añadido exitosamente',
            'ultimo_id' => $user->id,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id);
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
        $user = User::find($id);
        if(!is_null($user)){
        $user->update($request->all());
        return $user;
       }  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user=User::find($id);
        $user->delete();
    }
}