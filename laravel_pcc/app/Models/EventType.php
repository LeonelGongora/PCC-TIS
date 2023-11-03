<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventType extends Model
{
    use HasFactory;
    
    protected $table = 'event_types';
    protected $fillable = [
        'nombre_tipo_evento',
    ];

    public function evento(){
        //$evento = Evento::where('evento_id', $this->id) -> first();

        //return $evento;

        return $this->hasMany('App\Models\Evento');
    }
}
