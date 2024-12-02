<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfessorsSubjectsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('professors_subjects')->insert([
            ['prof_id' => 1, 'subject_id' => 1, 'group_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['prof_id' => 2, 'subject_id' => 2, 'group_id' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
