<?php

namespace App\Http\Controllers;

use App\Models\Event_Notification;
use Illuminate\Http\Request;

class EventNotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Event_Notification::all();
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
        $eventnotification = new Event_Notification($request->all());
        $eventnotification->save();
        return $eventnotification;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event_Notification  $event_Notification
     * @return \Illuminate\Http\Response
     */
    public function show(Event_Notification $event_Notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Event_Notification  $event_Notification
     * @return \Illuminate\Http\Response
     */
    public function edit(Event_Notification $event_Notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event_Notification  $event_Notification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event_Notification $event_Notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event_Notification  $event_Notification
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event_Notification $event_Notification)
    {
        //
    }
}
