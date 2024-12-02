<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('subjects')->insert([
            ['subject_name' => 'Developement Front-End', 'branch_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['subject_name' => 'Developement BackEnd', 'branch_id' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
