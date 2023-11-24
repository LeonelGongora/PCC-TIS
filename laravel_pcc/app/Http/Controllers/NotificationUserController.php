<?php

namespace App\Http\Controllers;

use App\Models\Notification_User;
use Illuminate\Http\Request;

class NotificationUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Notification_User::all();
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
        $notificationuser = new Notification_User($request->all());
        $notificationuser->save();
        return $notificationuser;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notification_User  $notification_User
     * @return \Illuminate\Http\Response
     */
    public function show(Notification_User $notification_User)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Notification_User  $notification_User
     * @return \Illuminate\Http\Response
     */
    public function edit(Notification_User $notification_User)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notification_User  $notification_User
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notification_User $notification_User)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notification_User  $notification_User
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notification_User $notification_User)
    {
        //
    }
}
