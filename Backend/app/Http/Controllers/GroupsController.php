<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;
use App\Models\Group;
use App\Models\Student;

class GroupsController extends Controller
{
    public function getBranches()
    {
        return Branch::all(['branch_id', 'branch_name']);
    }

    public function getGroups()
    {
        return Group::with('branch:branch_id,branch_name')->get(['group_id', 'group_name', 'branch_id']);
    }
    public function getStudents(Request $request)
    {
        $query = Student::query();
        $query->selectRaw('
        students.student_id,
        students.first_name,
        students.last_name,
        students.card_number,
        students.branch_id,
        students.group_id,
        students.grade,
        students.gmail,  
        COALESCE(SUM(CASE WHEN attendance.attended = 0 THEN 1 ELSE 0 END), 0) AS total_absences,
        COALESCE(SUM(CASE WHEN attendance.attended = 1 THEN 1 ELSE 0 END), 0) AS justified_absences,
        COALESCE(COUNT(DISTINCT warnings.warning_id), 0) AS tardies
    ')
            ->leftJoin('attendance', 'attendance.student_id', '=', 'students.student_id')
            ->leftJoin('warnings', 'warnings.student_id', '=', 'students.student_id')
            ->groupBy('students.student_id', 'students.first_name', 'students.last_name', 'students.card_number', 'students.branch_id', 'students.group_id', 'students.grade');

        if ($request->has('branch_id')) {
            $query->where('students.branch_id', $request->input('branch_id'));
        }

        if ($request->has('group_id')) {
            $query->where('students.group_id', $request->input('group_id'));
        }

        if ($request->has('search')) {
            $query->where(function ($subQuery) use ($request) {
                $subQuery->where('students.first_name', 'LIKE', '%' . $request->input('search') . '%')
                    ->orWhere('students.last_name', 'LIKE', '%' . $request->input('search') . '%')
                    ->orWhere('students.card_number', 'LIKE', '%' . $request->input('search') . '%');
            });
        }

        $students = $query->get();

        return response()->json($students);
    }

}