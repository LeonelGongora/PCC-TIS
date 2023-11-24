<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification_User extends Model
{
    use HasFactory;
    protected $table = 'notification_user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'notification_id', 'user_id',
    ];
}
