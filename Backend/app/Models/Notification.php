<?php
// app/Models/Notification.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\DatabaseNotification;

class Notification extends DatabaseNotification
{
    protected $fillable = [
        'type',
        'notifiable_type',
        'notifiable_id',
        'data',
        'read_at'
    ];

    // You can define the relationship with justification
    public function justification()
    {
        return $this->morphTo();
    }
}
