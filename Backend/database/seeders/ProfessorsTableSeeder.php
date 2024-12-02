<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfessorsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('professors')->insert([
            ['first_name' => 'John', 'last_name' => 'Doe', 'created_at' => now(), 'updated_at' => now(), 'password' => 12345, 'gmail' => 'JohnDoe@prof.com'],
            ['first_name' => 'Jane', 'last_name' => 'Smith', 'created_at' => now(), 'updated_at' => now(), 'password' => 12345, 'gmail' => 'JaneSmith@prof.com'],
        ]);
    }
}
