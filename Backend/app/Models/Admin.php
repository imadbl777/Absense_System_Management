<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    use HasApiTokens, Notifiable;
    protected $table = 'admins';
    protected $primaryKey = 'admin_id';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
    ];

    public function isAdmin()
    {
        return true;
    }
    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable')->where('type', 'App\Notifications\NewJustificationNotification');
    }
}