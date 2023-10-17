<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventoUser extends Model
{
    use HasFactory;
    protected $table = 'evento_user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'event_id', 'user_id', 'requisitoZip', 'TallaPolera', 
    ];
}
