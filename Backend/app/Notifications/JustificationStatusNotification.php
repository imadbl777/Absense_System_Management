<?php

namespace App\Notifications;

use App\Models\Justification;
use Illuminate\Notifications\Notification;

class JustificationStatusNotification extends Notification
{
    public $justification;

    public function __construct(Justification $justification)
    {
        $this->justification = $justification;
    }

    public function via($notifiable)
    {
        return ['database', 'broadcast']; // Include broadcast if using real-time notifications
    }


    public function toDatabase($notifiable)
    {
        return [
            'justification_id' => $this->justification->justification_id,
            'status' => $this->justification->status,
            'message' => 'Your justification status has been updated.'
        ];
    }
}