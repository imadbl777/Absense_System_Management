<?php

// app/Models/Justification.php
namespace App\Models;

use App\Notifications\JustificationStatusNotification;
use App\Notifications\NewJustificationNotification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Justification extends Model
{
    use Notifiable;
    
    protected $table = 'justifications';
    protected $primaryKey = 'justification_id';

    protected $fillable = [
        'student_id',
        'session_id',
        'description',
        'status',
        'admin_comment',
        'document_path',
        'submitted_at',
        'reviewed_at'
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }

    public function session()
    {
        return $this->belongsTo(Session::class, 'session_id');
    }


    public function sendNewJustificationNotification()
    {
        $admins = User::where('role', 'admin')->get();

        foreach ($admins as $admin) {
            $admin->notify(new NewJustificationNotification($this));
        }
    }

  
    public function sendStatusUpdateNotification()
    {
        $this->student->user->notify(new JustificationStatusNotification($this));
    }
}
