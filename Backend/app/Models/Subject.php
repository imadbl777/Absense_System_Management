<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $primaryKey = 'subject_id';
    
    protected $fillable = [
        'subject_name',
        'branch_id'
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id');
    }

    public function sessions()
    {
        return $this->hasMany(Session::class, 'subject_id');
    }

    public function professorSubjects()
    {
        return $this->hasMany(ProfessorSubject::class, 'subject_id');
    }

    public function professors()
    {
        return $this->belongsToMany(Professor::class, 'professors_subjects', 'subject_id', 'prof_id')
                    ->withPivot('group_id');
    }
}
