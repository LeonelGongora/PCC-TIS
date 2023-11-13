<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event_Sponsor extends Model
{
    use HasFactory;
    protected $table = 'event_sponsor';
    protected $fillable = [
        'event_id',
        'sponsor_id'
    ];
}
