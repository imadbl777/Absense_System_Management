<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class JustificationSubmitted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $student_full_name;
    public string $description;
    public string $submitted_at;

    /**
     * Create a new event instance.
     */
    public function __construct(string $first_name, string $last_name)
    {
        $this->student_full_name = "$first_name $last_name";
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return ['mychatapptest'];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'new-admin-notification';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'student_full_name' => $this->student_full_name,
        ];
    }
}
