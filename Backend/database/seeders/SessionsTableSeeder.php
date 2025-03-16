<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SessionsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('sessions')->insert([
            [
                'subject_id' => 1,
                'group_id' => 1,
                'prof_id' => 1,
                'session_date' => '2025-01-12',
                'session_hours' => 2,
                'time' => "14:30",
                'session_topic' => 'Calculus',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'subject_id' => 2,
                'group_id' => 2,
                'prof_id' => 2,
                'session_date' => '2025-01-12',
                'session_hours' => 5,
                'time' => "08:30",
                'session_topic' => 'Thermodynamics',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
