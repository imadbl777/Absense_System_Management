<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewJustificationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $justification;

    public function __construct($justification)
    {
        $this->justification = $justification;
    }

    public function broadcastOn()
    {
        return new Channel('justifications');
    }

    public function broadcastAs()
    {
        return 'justification.created';
    }
}
