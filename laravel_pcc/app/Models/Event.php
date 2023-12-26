<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EventType;
use App\Models\Attribute;
use App\Models\User;
use App\Models\Requirement;
use App\Models\Organizer;
use App\Models\Sponsor;
use App\Models\Team;
use App\Models\Activity;
use App\Models\Information;


class Event extends Model
{
    use HasFactory;

    protected $table = 'events';

    protected $fillable = [
        'nombre_evento',
        'fecha_inicio',
        'numero_contacto',
        'descripcion',
        'fecha_fin',
        'participantes_equipo',
        'name',
        'event_type_id'
    ];

    protected $with = ['event_type', 'attributes', 'requirements', 
    'organizers', 'sponsors', 'teams', 'activities', 'informations', 'users'];

    public function event_type(){

        return $this->belongsTo(EventType::class, 'event_type_id', 'id');

    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'evento_user', 'event_id', 'user_id');
    }
    
    public function teams()
    {
        return $this->hasMany(Team::class, 'event_id', 'id');
    }

    public function attributes(){

        return $this->hasMany(Attribute::class, 'event_id', 'id');

    }

    public function requirements(){

        return $this->hasMany(Requirement::class, 'event_id', 'id');

    }

    public function activities(){

        return $this->hasMany(Activity::class, 'event_id', 'id');

    }

    public function informations(){

        return $this->hasMany(Information::class, 'event_id', 'id');

    }

    public function organizers(){

        return $this->belongsToMany(Organizer::class, 'event_organizer', 'event_id', 'organizer_id');

    }

    public function sponsors(){

        return $this->belongsToMany(Sponsor::class, 'event_sponsor', 'event_id', 'sponsor_id')->withPivot('categoria');


    }

    public function notifications(){
        return $this->belongsToMany(Notification::class, 'event_notification');
    }

}