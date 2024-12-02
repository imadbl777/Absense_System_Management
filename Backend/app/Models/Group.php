<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $primaryKey = 'group_id';

    protected $fillable = [
        'group_name',
        'branch_id'
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'group_id');
    }

    public function sessions()
    {
        return $this->hasMany(Session::class, 'group_id');
    }

    public function professorSubjects()
    {
        return $this->hasMany(ProfessorSubject::class, 'group_id');
    }
}
