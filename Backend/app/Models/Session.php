<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $primaryKey = 'session_id';

    protected $fillable = [
        'subject_id',
        'group_id',
        'prof_id',
        'session_date',
        'session_hours',
        'session_topic'
    ];

    protected $casts = [
        'session_date' => 'date'
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function group()
    {
        return $this->belongsTo(Group::class, 'group_id');
    }

    public function professor()
    {
        return $this->belongsTo(Professor::class, 'prof_id');
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class, 'session_id');
    }
    public function justifications()
    {
        return $this->hasMany(Justification::class, 'session_id');
    }
}
