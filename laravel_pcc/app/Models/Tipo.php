<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipo extends Model
{
    use HasFactory;
    protected $table = 'tipos';
    protected $primaryKey = 'id';
    protected $fillable = [
        'cargo', 'privilegio',
    ];

    public function users(){
        return $this->belongsToMany(User::class, 'tipo_user');
    }
}
