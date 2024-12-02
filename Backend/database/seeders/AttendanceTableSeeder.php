<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttendanceTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('attendance')->insert([
            ['session_id' => 1, 'student_id' => 1, 'attended' => true, 'created_at' => now(), 'updated_at' => now()],
            ['session_id' => 2, 'student_id' => 2, 'attended' => false, 'created_at' => now(), 'updated_at' => now()],
            ['session_id' => 2, 'student_id' => 2, 'attended' => false, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
