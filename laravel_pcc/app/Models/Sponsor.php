<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Event;

class Sponsor extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_patrocinador',
        'imagen_patrocinador',
    ];

    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_sponsor', 'sponsor_id','event_id');
    }
}
