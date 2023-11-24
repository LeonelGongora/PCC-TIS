<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $table = 'notifications';
    protected $primaryKey = 'id';
    protected $fillable = [
        'contenido', 'informacion', 'leido',
    ];

    public function events(){
        return $this->belongsToMany(Event::class, 'event_notification');
    }

    public function users(){
        return $this->belongsToMany(User::class, 'notification_user');
    }
}
