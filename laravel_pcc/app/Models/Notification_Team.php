<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification_Team extends Model
{
    use HasFactory;
    protected $table = 'notification_team';
    protected $primaryKey = 'id';
    protected $fillable = [
        'notification_id', 'team_id',
    ];
}
