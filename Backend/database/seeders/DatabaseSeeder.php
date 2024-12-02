<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            AdminSeeder::class,
            BranchesTableSeeder::class,
            YearsTableSeeder::class,
            GroupsTableSeeder::class,
            ProfessorsTableSeeder::class,
            SubjectsTableSeeder::class,
            ProfessorsSubjectsTableSeeder::class,
            StudentsTableSeeder::class,
            SessionsTableSeeder::class,
            AttendanceTableSeeder::class,
            WarningsTableSeeder::class,
        ]);
    }
}
