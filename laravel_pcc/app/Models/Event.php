<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $table = 'events';
    protected $fillable = [
        'nombre_evento',
        'requisitos',
        'fecha_inicio',
        'numero_contacto',
        'descripcion',
        'fecha_limite',
        'fecha_fin',
        'participantes_equipo',
        'event_type_id',

    ];
}