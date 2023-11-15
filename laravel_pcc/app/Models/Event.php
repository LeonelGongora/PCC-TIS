<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EventType;
use App\Models\Attribute;
use App\Models\User;
use App\Models\Requirement;

class Event extends Model
{
    use HasFactory;

    protected $table = 'events';

    protected $fillable = [
        'nombre_evento',
        'fecha_inicio',
        'numero_contacto',
        'descripcion',
        'fecha_limite',
        'fecha_fin',
        'participantes_equipo',
        'name',
        'event_type_id'
    ];

    protected $with = ['event_type', 'attributes', 'requirements'];

    public function event_type(){

        return $this->belongsTo(EventType::class, 'event_type_id', 'id');

    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'evento_user', 'event_id', 'user_id');
    }

    public function attributes(){

        return $this->hasMany(Attribute::class, 'event_id', 'id');

    }

    public function requirements(){

        return $this->hasMany(Requirement::class, 'event_id', 'id');

    }

    public function organizers(){

        return $this->belongsToMany('App\Models\Organizador');

    }

    public function sponsors(){

        return $this->belongsToMany('App\Models\Patrocinador');

    }
}