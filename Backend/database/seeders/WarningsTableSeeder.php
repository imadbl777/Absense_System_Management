<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WarningsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('warnings')->insert([
            [
                'student_id' => 2, 
                'missed_hours' => 5, 
                'warning_date' => '2024-11-03', 
                'reason' => 'Exceeded allowable absences', 
                'created_at' => now(), 
                'updated_at' => now()
            ],
        ]);
    }
}
