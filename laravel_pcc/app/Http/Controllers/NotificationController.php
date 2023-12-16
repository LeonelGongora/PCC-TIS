<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use App\Models\User;

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
        ->where('users.id', $id)
        ->select('notifications.*', 'notification_user.user_id', 'notification_user.auxieventid')
        ->get();

        $notificacionteam = DB::table('notifications')
        ->join('notification_team', 'notifications.id', '=', 'notification_team.notification_id')
        ->join('teams', 'teams.id', '=', 'notification_team.team_id')
        ->join('users', 'users.id', '=', 'teams.id_coach')
        ->where('users.id', $id)
        ->select('notifications.*')
        ->get();

        $notificacioneventindi = DB::table('notifications')
        ->join('event_notification', 'notifications.id', '=', 'event_notification.notification_id')
        ->join('events', 'events.id', '=', 'event_notification.event_id')
        ->join('evento_user', 'events.id', '=', 'evento_user.event_id')
        ->join('users', 'users.id', '=', 'evento_user.user_id') 
        ->where('evento_user.solicitud', 1)
        ->orWhere('evento_user.solicitud', 0)
        ->where('users.id', $id)
        ->whereColumn('notifications.created_at','>','evento_user.created_at')
        ->select('notifications.*')
        ->get();

        $notificacioneventteam = DB::table('notifications')
        ->join('event_notification', 'notifications.id', '=', 'event_notification.notification_id')
        ->join('events', 'events.id', '=', 'event_notification.event_id')
        ->join('teams', 'teams.event_id', '=', 'events.id')
        ->where('teams.id_coach', $id)
        ->whereColumn('notifications.created_at','>','teams.created_at')
        ->select('notifications.*')
        ->get();

        // $countnoti = DB::table('users')
        // ->where('users.id', $id)
        // ->select('users.auxinoti')
        // ->get();

        $user = User::find($id);
        $countnoti = $user->auxinoti;
        
        $array = Arr::collapse([$notificacionuser, $notificacionteam, $notificacioneventindi, $notificacioneventteam]);

        return response()->json([
            'status' => 200,
            'notifications' => $array,
            'countnoti' => $countnoti,
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
