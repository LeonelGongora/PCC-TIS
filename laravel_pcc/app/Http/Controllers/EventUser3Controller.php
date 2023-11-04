<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\DB;

class EventUser3Controller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('evento_user')
        ->join('users', 'evento_user.user_id', '=', 'users.id')
        ->join('events', 'evento_user.event_id', '=', 'events.id')
        // ->where('evento_user.event_id')
        ->select('users.*', 'evento_user.event_id', 'evento_user.id as eventuserid','evento_user.solicitud', 'evento_user.requisitoZip', 'events.nombre_evento')
        ->orderBy('evento_user.event_id', 'asc')
        // ->where('boletas.estado', 1)
        ->get();
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
        return DB::table('evento_user')
        ->join('users', 'evento_user.user_id', '=', 'users.id')
        ->join('events', 'evento_user.event_id', '=', 'events.id')
        ->where('evento_user.event_id', $id)
        ->where('evento_user.solicitud', 0)
        ->select('users.*', 'evento_user.event_id', 'evento_user.id as eventuserid','evento_user.solicitud', 'evento_user.requisitoZip', 'events.nombre_evento')
        ->orderBy('evento_user.event_id', 'asc')
        // ->where('boletas.estado', 1)
        ->get();
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
