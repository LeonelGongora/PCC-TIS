<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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
        $req = new Request($request->all());
        return DB::table('tipo_user')
        ->join('users', 'tipo_user.user_id', '=', 'users.id')
        ->join('tipos', 'tipo_user.tipo_id', '=', 'tipos.id')
        ->where('users.email', $req->email)
        ->where('users.password', $req-> password)
        ->select('users.id', 'users.nombre', 'users.apellido', 'users.ci', 'tipos.cargo', 'tipos.privilegio')
        ->get();

        // return DB::table('users')
        // // ->join('users', 'tipo_user.user_id', '=', 'users.id')
        // // ->join('tipos', 'tipo_user.tipo_id', '=', 'tipos.id')
        // ->where('users.email', $req->email)
        // ->where('users.password', $req-> password)
        // ->select('users.id', 'users.nombre')
        // ->get();
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
