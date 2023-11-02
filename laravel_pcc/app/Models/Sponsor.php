<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_patrocinador',
        'imagen_patrocinador',
    ];

    public function eventos(){

        return $this->belongsToMany('App\Models\Evento');

    }
}
