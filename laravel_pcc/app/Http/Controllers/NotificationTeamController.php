<?php

namespace App\Http\Controllers;

use App\Models\Notification_Team;
use Illuminate\Http\Request;

class NotificationTeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Notification_Team::all();
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
        $notificationteam = new Notification_Team($request->all());
        $notificationteam->save();
        return $notificationteam;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notification_Team  $notification_Team
     * @return \Illuminate\Http\Response
     */
    public function show(Notification_Team $notification_Team)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Notification_Team  $notification_Team
     * @return \Illuminate\Http\Response
     */
    public function edit(Notification_Team $notification_Team)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notification_Team  $notification_Team
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notification_Team $notification_Team)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notification_Team  $notification_Team
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notification_Team $notification_Team)
    {
        //
    }
}
