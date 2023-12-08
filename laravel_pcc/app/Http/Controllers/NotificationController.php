<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Notification::all();
    }

    public function misNotificaciones($id){

        $notificacionuser = DB::table('notifications')
        ->join('notification_user', 'notifications.id', '=', 'notification_user.notification_id')
        ->join('users', 'users.id', '=', 'notification_user.user_id')
        // ->join('event_types', 'event_types.id', '=', 'events.event_type_id')
        ->where('users.id', $id)
        ->select('notifications.*')
        ->get();

        $notificacionteam = DB::table('notifications')
        ->join('notification_team', 'notifications.id', '=', 'notification_team.notification_id')
        ->join('teams', 'teams.id', '=', 'notification_team.team_id')
        ->join('users', 'users.id', '=', 'teams.id_coach')
        ->where('users.id', $id)
        ->select('notifications.*')
        ->get();

        // $results = array();
        // $results[] = $events;
        // $results[] = $equipos;

        // $results = array();
        // $r = array();
        // $results[] = $events;
        // $results[] = $equipos;
        // $mapeo = function($elemento) {
        //     return array(
        //         'id' => $elemento['id'],
        //         'nombre_evento' => $elemento['nombre_evento']
        //         );
        // };
        // $r = array_map($mapeo, $results);
        $r = array();
        // $r = array_merge($notificacionuser, $notificacionteam);
        $array = Arr::collapse([$notificacionuser, $notificacionteam]);
        // $orde = sort($array, int '$created_at' = SORT_REGULAR): true { }

        // $ordenados = $array->sortByDesc('created_at')->paginate(5);
        // $prueba = array.sort((a, b) => new Date(a.fechas).getTime() > new Date(b.fechas).getTime());
        // $ordenados = $array::latest()-get();

        // $e = array_merge()
        // $mapeo = function($elemento) {
        //     return array(
        //         'id' => $elemento['id'],
        //         'nombre_evento' => $elemento['nombre_evento']
        //         );
        // };
        // $r = array_map($mapeo, array($events, $equipos));

        return response()->json([
            'status' => 200,
            'notifications' => $array,

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
        $notification = new Notification($request->all());
        $notification->save();
        return $notification;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notification $notification)
    {
        //
    }
}
