<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    use HasFactory;
    protected $fillable = [
        'contenido_requisito',
        'event_id',
    ];

    public function event(){

        return $this->belongsTo('App\Models\Evento');

    }
}
