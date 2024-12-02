<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminNotification extends Model
{
    protected $fillable = [
        'student_id', 
        'session_id', 
        'type', 
        'message', 
        'is_read'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function session()
    {
        return $this->belongsTo(Session::class, 'session_id');
    }
}
