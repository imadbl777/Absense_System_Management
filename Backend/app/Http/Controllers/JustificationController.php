<?php

namespace App\Http\Controllers;

use App\Events\NewJustificationEvent;
use App\Models\Justification;
use App\Models\Session;
use App\Models\Admin;
use App\Notifications\NewJustificationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;
use App\Events\JustificationSubmitted;
use App\Events\Message;
use App\Events\NewAdminNotificationEvent;
use App\Models\AdminNotification;

class JustificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // Student Methods

    public function getAbsentSessions()
    {
        $student_id = auth()->user()->student_id;
        $query = Session::whereHas('attendance', function ($query) use ($student_id) {
            $query->where('student_id', $student_id)
                ->where('attended', false);
        });
        $query->whereDoesntHave('justifications', function ($query) use ($student_id) {
            $query->where('student_id', $student_id);
        });
        $absentSessions = $query->with(['subject', 'professor'])->get();

        return response()->json($absentSessions);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'session_id' => 'required|exists:sessions,session_id',
                'description' => 'required|string|max:255',
                'document' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
            ]);


            $path = null;


            if ($request->hasFile('document')) {
                $file = $request->file('document');


                $filename = uniqid() . '_' . $file->getClientOriginalName();


                $path = $file->storeAs('justifications', $filename, 'public');


                $publicUrl = Storage::url($path);


                $path = $publicUrl;
            }


            $justification = Justification::create([
                'student_id' => auth()->user()->student_id,
                'session_id' => $validated['session_id'],
                'description' => $validated['description'],
                'document_path' => $path,
                'status' => 'pending',
            ]);
            $adnot = AdminNotification::create([
                'student_id' => auth()->user()->student_id,
                'session_id' => $validated['session_id'],
                'type' => 'justification',
                'message' => sprintf(
                    'New justification submitted by %s %s for %s',
                    $request->user()->first_name,
                    $request->user()->last_name,
                    $justification->session->subject->subject_name
                )
            ]);
            event(new JustificationSubmitted(
                auth()->user()->first_name,
                auth()->user()->last_name,
            ));
            // event(new NewAdminNotificationEvent(
            //     $adnot
            // ));


            return response()->json([
                'message' => 'Justification submitted successfully',
                'justification' => $justification
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            \Log::error('Justification submission error: ' . $e->getMessage());
            return response()->json(['error' => 'An unexpected error occurred', 'details' => $e->getMessage()], 500);
        }
    }



    public function review(Request $request, $id)
    {

        $request->validate([
            'status' => 'required|in:approved,rejected',
            'admin_comment' => 'nullable|string|max:255'
        ]);


        $justification = Justification::findOrFail($id);


        $justification->update([
            'status' => $request->status,
            'admin_comment' => $request->admin_comment,
            'reviewed_at' => now()
        ]);


        if ($request->status === 'approved') {
            $justification->session->attendance()
                ->where('student_id', $justification->student_id)
                ->update(['attended' => true]);
        }


        $justification->sendStatusUpdateNotification();

        return response()->json([
            'justification' => $justification,
            'Justifstatus' => $justification->status,
            'admin_comment' => $justification->admin_comment,
            'reviewed_at' => $justification->reviewed_at
        ]);
    }

    public function getMyJustifications()
    {
        $justifications = Justification::where('student_id', auth()->user()->student_id)
            ->with(['session.subject'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($justifications);
    }

    // Admin Methods

    public function index()
    {
        // Fetch justifications with related student and session.subject
        $justifications = Justification::with(['student', 'session.subject'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($justifications);
    }
    public function message(Request $request)
    {
        event(new Message($request->input('username'), $request->input('message')));
        return [];
    }
    public function downloadDocument($id)
    {
        try {
           
            $justification = Justification::findOrFail($id);

          
            if ($justification->student_id !== auth()->user()->student_id) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $fullPath = public_path('storage/Justifications/' . basename($justification->document_path));

            \Log::info('Download attempt details', [
                'original_path' => $justification->document_path,
                'full_server_path' => $fullPath
            ]);

 
            if (!file_exists($fullPath)) {
                \Log::error('Document not found', [
                    'path' => $fullPath,
                    'original_path' => $justification->document_path
                ]);
                return response()->json([
                    'error' => 'Document not found',
                    'path' => $fullPath
                ], 404);
            }

            $filename = basename($justification->document_path);

            
            return response()->download(
                $fullPath,
                $filename,
                [
                    'Content-Type' => mime_content_type($fullPath),
                    'Content-Disposition' => 'inline; filename="' . $filename . '"'
                ]
            );
        } catch (\Exception $e) {
            \Log::error('Download error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'An error occurred while downloading the document',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function getAdminNotifications()
    {
        $notifications = AdminNotification::with(['student', 'session.subject'])
            ->orderBy('created_at', 'desc')
            ->where('is_read', false)
            ->paginate(10);

        return response()->json($notifications);
    }
    public function markNotificationAsRead($id)
    {
        $notification = AdminNotification::findOrFail($id);
        $notification->update(['is_read' => true]);

        return response()->json(['message' => 'Notification marked as read']);
    }
}
