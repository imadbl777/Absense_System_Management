<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Justification;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return a list of admins (can be paginated or filtered)
        $admins = Admin::latest()->paginate(10);
        return response()->json($admins);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Optional: You can create a form in the frontend for creating an admin
        return response()->json(['message' => 'Create Admin form']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $admin = new Admin();
        $admin->name = $request->input('name');
        $admin->email = $request->input('email');
        $admin->password = Hash::make($request->input('password'));
        $admin->save();

        return response()->json(['message' => 'Admin created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        return response()->json($admin);
    }


    public function edit(Admin $admin)
    {
        // Optional: You can create a form in the frontend for editing an admin
        return response()->json(['message' => 'Edit Admin form']);
    }


    public function update(Request $request, Admin $admin)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:admins,email,' . $admin->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $admin->name = $request->input('name', $admin->name);
        $admin->email = $request->input('email', $admin->email);

        if ($request->has('password')) {
            $admin->password = Hash::make($request->input('password'));
        }

        $admin->save();

        return response()->json(['message' => 'Admin updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();
        return response()->json(['message' => 'Admin deleted successfully']);
    }


    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = Admin::where('email', $request->input('email'))->first();


        if (!$user) {
            return response()->json(['message' => 'User Not Found'], 401);
        }


        if ($request->input('password') !== $user->password) {
            return response()->json(['message' => 'Wrong password'], 401);
        }


        $token = $user->createToken('auth_token');


        return response()->json([
            'token' => $token->plainTextToken,
            'role' => $user->role
        ]);
    }

    
    public function getProfile()
    {
        $admin = auth()->user();

        if (!$admin) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        return response()->json([
            'name' => $admin->name,
            'email' => $admin->email
        ]);
    }
    public function getStatistics(): JsonResponse
    {
        $now = Carbon::now();
        $sixMonthsAgo = $now->copy()->subMonths(6);

        // Get current month statistics
        $currentMonthStart = $now->copy()->startOfMonth();
        $currentMonth = [
            'total_justifications' => Justification::whereMonth('created_at', $now->month)->count(),
            'approved_justifications' => Justification::whereMonth('created_at', $now->month)
                ->where('status', 'approved')->count(),
            'pending_justifications' => Justification::whereMonth('created_at', $now->month)
                ->where('status', 'pending')->count(),
            'rejected_justifications' => Justification::whereMonth('created_at', $now->month)
                ->where('status', 'rejected')->count(),
        ];

        $trend = collect(range(0, 5))->map(function ($monthsAgo) use ($now) {
            $date = $now->copy()->subMonths($monthsAgo);
            return [
                'month' => $date->format('M'),
                'total' => Justification::whereMonth('created_at', $date->month)
                    ->whereYear('created_at', $date->year)
                    ->count(),
                'approved' => Justification::whereMonth('created_at', $date->month)
                    ->whereYear('created_at', $date->year)
                    ->where('status', 'approved')
                    ->count()
            ];
        })->reverse()->values();

        // Get top 5 students with most absences
        $topAbsentees = Student::select('students.*')
            ->selectRaw('COUNT(attendance.attendance_id) as total_absences')
            ->join('attendance', 'students.student_id', '=', 'attendance.student_id')
            ->where('attendance.attended', 0)
            ->groupBy('students.student_id')
            ->orderBy('total_absences', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($student) {
                return [
                    'student_id' => $student->student_id,
                    'student' => [
                        'name' => $student->first_name . ' ' . $student->last_name
                    ],
                    'total_absences' => $student->total_absences
                ];
            });

        return response()->json([
            'current_month' => $currentMonth,
            'trend' => $trend,
            'top_absentees' => $topAbsentees,
            'updated_at' => now()
        ]);
    }

}
