<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AttendanceTableSeeder extends Seeder
{
    public function run()
    {
        $students = DB::table('students')->pluck('student_id'); 

        foreach ($students as $student_id) {
            DB::table('attendance')->insert([
                'session_id'  => rand(1, 2), 
                'student_id'  => $student_id,
                'attended'    => (bool)rand(0, 1),
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now(),
            ]);
        }
    }
}
