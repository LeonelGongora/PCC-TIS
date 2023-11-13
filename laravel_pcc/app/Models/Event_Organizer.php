<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event_Organizer extends Model
{
    use HasFactory;
    protected $table = 'event_organizer';
    protected $fillable = [
        'event_id',
        'organizer_id'
    ];

}
