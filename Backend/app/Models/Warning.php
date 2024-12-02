<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Warning extends Model
{
    protected $primaryKey = 'warning_id';
    
    protected $fillable = [
        'student_id',
        'missed_hours',
        'warning_date',
        'reason'
    ];

    protected $casts = [
        'warning_date' => 'date'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}
