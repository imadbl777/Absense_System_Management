<?php
namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Group;
use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentsTableSeeder extends Seeder
{
    public function run()
    {

        $branches = Branch::all();
        $groups = Group::all();


        foreach ($branches as $branch) {
            foreach ($groups as $group) {

                $existingStudentCount = Student::where('branch_id', $branch->branch_id)
                    ->where('group_id', $group->group_id)
                    ->count();


                $studentsToCreate = 20 - $existingStudentCount;


                if ($studentsToCreate > 0) {
                    Student::factory()->count($studentsToCreate)->create([
                        'branch_id' => $branch->branch_id,
                        'group_id' => $group->group_id
                    ]);
                } elseif ($studentsToCreate < 0) {
                    $extraStudents = Student::where('branch_id', $branch->branch_id)
                        ->where('group_id', $group->group_id)
                        ->take(abs($studentsToCreate))
                        ->get();

                    foreach ($extraStudents as $student) {
                        $student->delete();
                    }
                }
            }
        }
    }
}