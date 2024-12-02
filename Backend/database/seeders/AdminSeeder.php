<?php

// database/seeders/AdminSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    public function run()
    {
        DB::table('admins')->insert([
            [
                'name' => 'Imad imad',
                'email' => 'Imad@imad.com',
                'password' => 12345, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'yassmine ladmine',
                'email' => 'superadmin@example.com',
                'password' => 12345,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
