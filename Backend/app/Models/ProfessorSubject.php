<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfessorSubject extends Model
{
    protected $table = 'professors_subjects';
    
    protected $fillable = [
        'prof_id',
        'subject_id',
        'group_id'
    ];

    public function professor()
    {
        return $this->belongsTo(Professor::class, 'prof_id');
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function group()
    {
        return $this->belongsTo(Group::class, 'group_id');
    }
}
