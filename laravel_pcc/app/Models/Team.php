<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Team extends Model
{
    use HasFactory;

    protected $table = 'teams';
    protected $fillable = [
        'nombre_equipo', 'event_id', 'solicitud', 'id_coach', 'zip',
    ];

    protected $with = ['users'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'team_user', 'team_id', 'user_id');
    }

    public function notifications(){
        return $this->belongsToMany(Notification::class, 'notification_team');
    }
}
