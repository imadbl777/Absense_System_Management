<?php
namespace App\Observers;

use App\Http\Controllers\AdminNotificationController;
use App\Models\AdminNotification;

class AdminNotificationObserver
{
    public function created(AdminNotification $notification)
    {
        (new AdminNotificationController)->broadcastAdminNotification($notification);
    }
}