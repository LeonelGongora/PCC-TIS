<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organizer extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_organizador',
        'imagen_organizador',
    ];

    public function eventos(){

        return $this->belongsToMany('App\Models\Evento');

    }
}
