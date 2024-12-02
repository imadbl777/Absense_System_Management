<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $table = 'attendance';
    protected $primaryKey = 'attendance_id';

    protected $fillable = [
        'session_id',
        'student_id',
        'attended'
    ];

    protected $casts = [
        'attended' => 'boolean'
    ];

    public function session()
    {
        return $this->belongsTo(Session::class, 'session_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}
