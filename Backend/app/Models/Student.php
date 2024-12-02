<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
class Student extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;
    protected $primaryKey = 'student_id';

    protected $fillable = [
        'first_name',
        'last_name',
        'card_number',
        'branch_id',
        'group_id',
        'gmail',
        'phone_number',
        'password',
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id');
    }

    public function group()
    {
        return $this->belongsTo(Group::class, 'group_id');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class, 'student_id');
    }

    public function warnings()
    {
        return $this->hasMany(Warning::class, 'student_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
