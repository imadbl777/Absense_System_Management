<?php
namespace App\Events;

use App\Models\AdminNotification;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewAdminNotificationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notification;

    public function __construct(AdminNotification $notification)
    {
        $this->notification = $notification;

    }

    public function broadcastOn()
    {
        return new Channel('mychatapptest');
    }

    public function broadcastAs()
    {
        return 'new-admin-notification';
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->notification->notification_id,
            'student_name' => $this->notification->student->first_name ?? 'Unknown Student',
            'message' => $this->notification->message,
            'type' => $this->notification->type,
            'created_at' => $this->notification->created_at->toISOString()
        ];
    }
}