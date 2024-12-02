<?php

namespace App\Notifications;

use App\Models\Justification;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class NewJustificationNotification extends Notification
{
    public $justification;

    public function __construct(Justification $justification)
    {
        $this->justification = $justification;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'justification_id' => $this->justification->justification_id,
            'student_id' => $this->justification->student_id,
            'status' => $this->justification->status,
            'message' => 'New justification submitted for approval.'
        ];
    }
}
