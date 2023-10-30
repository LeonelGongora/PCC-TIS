<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EventoAbiertoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = DB::table('events')
        ->join('event_types', 'event_types.id', '=', 'events.event_type_id')
        // ->where('events.fecha_limite', '<=', Carbon::now()->format('Y-m-d'))
        ->where('events.fecha_fin', '>=', Carbon::now()->format('Y-m-d'))
        ->select('events.*', 'event_types.nombre_tipo_evento')
        ->get();

        return response()->json([
            'status' => 200,
            'events' => $events,

        ]);
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
        $res=false;
        $event = Event::find($id);
        if($event->fecha_limite < Carbon::now()->format('Y-m-d')){
            $res=true;
        }
        return response()->json([
            'status' => 200,
            'pasoInscripcion' => $res,

        ]);
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