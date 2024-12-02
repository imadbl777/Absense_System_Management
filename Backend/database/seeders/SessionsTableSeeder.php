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
                'session_date' => '2024-11-01', 
                'session_hours' => 2, 
                'session_topic' => 'Calculus', 
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'subject_id' => 2, 
                'group_id' => 2, 
                'prof_id' => 2, 
                'session_date' => '2024-11-02', 
                'session_hours' => 3, 
                'session_topic' => 'Thermodynamics', 
                'created_at' => now(), 
                'updated_at' => now()
            ],
        ]);
    }
}
