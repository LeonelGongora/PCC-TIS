<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Event;

class Organizer extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_organizador',
        'imagen_organizador',
    ];

    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_organizer', 'organizer_id','event_id');
    }

}
