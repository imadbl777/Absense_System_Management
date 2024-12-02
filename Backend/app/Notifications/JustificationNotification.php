<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;

class JustificationNotification extends Notification
{
    use Queueable;

    public $justification;

    public function __construct($justification)
    {
        $this->justification = $justification;
    }

    public function via($notifiable)
    {
        return ['broadcast', 'database'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'justification' => $this->justification,
        ]);
    }

    public function toArray($notifiable)
    {
        return [
            'justification' => $this->justification,
        ];
    }
}
