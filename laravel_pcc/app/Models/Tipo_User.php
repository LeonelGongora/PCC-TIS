<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipo_User extends Model
{
    use HasFactory;
    protected $table = 'tipo_user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'tipo_id', 'user_id',
    ];
}
