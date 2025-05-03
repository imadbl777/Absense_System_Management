<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    public function markAttendance(Request $request)
    {
        $studentId = $request->input('student_id');
        $sessionId = $request->input('session_id');

        if (!$sessionId) {
            return response()->json(['message' => 'Session not found'], 400);
        }

        $attendance = Attendance::firstOrCreate(
            ['student_id' => $studentId, 'session_id' => $sessionId],
            ['attended' => 1]
        );

        return response()->json(['message' => 'Attendance marked successfully'], 200);
    }

    public function absent(Request $request)
    {
        $id = $request->query('studentId');
        $isnotattended = Attendance::with(['session', 'student.group'])
            ->where('attended', false)
            ->where('student_id', $id)
            ->get(['attended', 'session_id', 'student_id']);

        return response()->json($isnotattended);
    }
}