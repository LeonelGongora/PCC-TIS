<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event_Notification extends Model
{
    use HasFactory;
    protected $table = 'event_notification';
    protected $primaryKey = 'id';
    protected $fillable = [
        'event_id', 'notification_id',
    ];
}
