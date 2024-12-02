<?php
namespace App\Notifications;

use App\Models\Justification;
use Illuminate\Notifications\Notification;

class JustificationSubmitted extends Notification
{
    public $justification;

    public function __construct(Justification $justification)
    {
        $this->justification = $justification;
    }

    public function via($notifiable)
    {
        return ['database']; // You can also send it via mail, if needed.
    }

    public function toDatabase($notifiable)
    {
        return [
            'message' => 'A new justification has been submitted.',
            'justification_id' => $this->justification->justification_id,
            'student_name' => $this->justification->student ? $this->justification->student->name : 'Unknown Student', // Ensure student exists
            'status' => $this->justification->status,
            'admin_comment' => $this->justification->admin_comment,
            'document_path' => $this->justification->document_path,
            'submitted_at' => $this->justification->submitted_at->toDateTimeString(), // Ensure date format
            'session_id' => $this->justification->session_id,
            'reviewed_at' => $this->justification->reviewed_at ? $this->justification->reviewed_at->toDateTimeString() : null,
        ];
    }
}
