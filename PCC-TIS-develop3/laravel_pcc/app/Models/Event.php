<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EventType;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_evento',
        'requisitos',
        'fecha_inicio',
        'numero_contacto',
        'descripcion',
        'fecha_limite',
        'fecha_fin',
        'participantes_equipo',
        'name',
        'event_type_id'
    ];

    protected $with = ['event_type'];

    public function event_type(){

        return $this->belongsTo(EventType::class, 'event_type_id', 'id');

    }

    public function attributes(){

        return $this->hasMany('App\Models\Atributo');

    }

    public function organizers(){

        return $this->belongsToMany('App\Models\Organizador');

    }

    public function sponsors(){

        return $this->belongsToMany('App\Models\Patrocinador');

    }
}