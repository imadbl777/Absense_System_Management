<?php
namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    // Get notifications for admin
    public function index()
    {
        // Ensure the authenticated user is an admin
        $admin = Auth::user(); // Assuming the admin is authenticated using sanctum

        if ($admin) {
            $notifications = $admin
                ->notifications()  // Get notifications for the admin
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            return response()->json([
                'notifications' => $notifications->items(),
                'total' => $notifications->total(),
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
            ]);
        }

        return response()->json(['error' => 'Admin not authenticated'], 401);
    }

    // Mark notification as read for admin
    public function markAsRead($id)
    {
        $admin = Auth::user(); 

        if ($admin) {
           
            $notification = $admin
                ->notifications()
                ->where('id', $id)
                ->first();

            if ($notification) {
                $notification->markAsRead();
                return response()->json(['message' => 'Notification marked as read']);
            }

            return response()->json(['error' => 'Notification not found'], 404);
        }

        return response()->json(['error' => 'Admin not authenticated'], 401);
    }
}
