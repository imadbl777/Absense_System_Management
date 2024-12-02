<?php
namespace App\Http\Controllers;

use App\Models\AdminNotification;
use Illuminate\Support\Facades\Auth;
use Pusher\Pusher;

class AdminNotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

   
    public function index()
    {
      
        $notifications = AdminNotification::with(['student', 'session.subject'])
            ->orderBy('created_at', 'desc')
            ->where('is_read', false)
            ->get();

        return response()->json($notifications);
    }

        public function markAsRead($id)
    {
       

        $notification = AdminNotification::findOrFail($id);
        $notification->update(['is_read' => true]);

        return response()->json(['message' => 'Notification marked as read']);
    }

    
    public function markAllAsRead()
    {
       

        AdminNotification::where('is_read', false)->update(['is_read' => true]);

        return response()->json(['message' => 'All notifications marked as read']);
    }

    
    public function broadcastAdminNotification($notification)
    {
        $pusher = new Pusher(
            config('broadcasting.connections.pusher.key'),
            config('broadcasting.connections.pusher.secret'),
            config('broadcasting.connections.pusher.app_id'),
            [
                'cluster' => config('broadcasting.connections.pusher.options.cluster'),
                'useTLS' => true
            ]
        );

        $pusher->trigger('admin-notifications', 'new-admin-notification', [
            'id' => $notification->id,
            'student_name' => $notification->student->full_name,
            'message' => $notification->message,
            'type' => $notification->type,
            'created_at' => $notification->created_at->toISOString()
        ]);
    }
}