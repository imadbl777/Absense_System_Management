<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Justification;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentsController extends Controller
{

    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);


        $user = Student::where('gmail', $request->input('email'))->first();


        if (!$user) {
            return response()->json(['message' => 'User Not Found'], 401);
        }


        if ($request->input('password') !== $user->password) {
            return response()->json(['message' => 'Wrong password'], 401);
        }


        $token = $user->createToken('auth_token');


        return response()->json([
            'token' => $token->plainTextToken,
            'role' => "student"
        ]);
    }
    public function getProfile()
    {
        $student = auth()->user();

       
        if (!$student) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        return response()->json([
            'first_name' => $student->first_name,
            'last_name' => $student->last_name,
            'gmail' => $student->gmail,
            'student_id' => $student->student_id, 
            'card_number' => $student->card_number,
            'phone_number' => $student->phone_number,
        ]);
    }
    public function getStudentDetails(Request $request)
    {
        $studentId = auth()->user()->student_id;


        $student = Student::with('group')
            ->select('first_name', 'last_name', 'group_id')
            ->where('student_id', $studentId)
            ->first();


        if (!$student) {
            return response()->json(['error' => 'Student not found'], 404);
        }

        return response()->json([
            'first_name' => $student->first_name,
            'last_name' => $student->last_name,
            'group_name' => $student->group ? $student->group->group_name : null,
        ]);
    }

}
