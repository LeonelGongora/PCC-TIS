<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    use HasFactory;
    protected $table = 'informations';
    protected $fillable = [
        'nombre_informacion',
        'contenido_informacion',
        'event_id'
    ];

    public function event(){

        return $this->belongsTo('App\Models\Evento');

    }
}
