<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Professor extends Model
{
    use HasApiTokens, Notifiable;
    protected $primaryKey = 'prof_id';

    protected $fillable = [
        'first_name',
        'last_name',
        'gmail',
        'password',
    ];

    public function sessions()
    {
        return $this->hasMany(Session::class, 'prof_id');
    }

    public function professorSubjects()
    {
        return $this->hasMany(ProfessorSubject::class, 'prof_id');
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'professors_subjects', 'prof_id', 'subject_id')
            ->withPivot('group_id');
    }
}
