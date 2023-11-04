<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_atributo',
        'tipo_dato_atributo',
        'event_id',
    ];

    public function event(){

        return $this->belongsTo('App\Models\Evento');

    }
}
