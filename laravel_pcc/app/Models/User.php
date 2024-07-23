<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Event;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'nombre', 'apellido', 'ci', 'pais','telefono','email', 'password', 'auxinoti',
    ];


    public function events()
    {
        return $this->belongsToMany(Event::class, 'evento_user', 'user_id','event_id');
    }


    public function tipos(){
        return $this->belongsToMany(Tipo::class, 'tipo_user');
    }

    public function notifications(){
        return $this->belongsToMany(Notification::class, 'notification_user');
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function hasPermission($permissionIndex)
    {
        $tipos = $this->tipos;
        foreach ($tipos as $tipo) {
            if ($tipo && isset($tipo->privilegio)) {
                $privilegio = $tipo->privilegio;

                $permissions = explode(',', $privilegio);
                if (isset($permissions[$permissionIndex]) && $permissions[$permissionIndex] == '1') {
                    return true;
                }
            }
        }
        return false;
    }
    public function hasAdminRole()
    {
        $tipos = $this->tipos;
        foreach ($tipos as $tipo) {
            if ($tipo && isset($tipo->privilegio) && $tipo->privilegio === 'admin') {
                return true;
            }
        }
        return false;
    }
}
