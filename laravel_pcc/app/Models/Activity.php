<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;
    protected $table = 'activities';
    protected $fillable = [
        'nombre_actividad',
        'fecha_inicio_actividad',
        'fecha_fin_actividad',
        'descripcion_actividad',
        'event_id',
    ];
}
