<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team_User extends Model
{
    use HasFactory;
    protected $table = 'team_user';
    protected $fillable = [
        'team_id',
        'user_id'
    ];
}
