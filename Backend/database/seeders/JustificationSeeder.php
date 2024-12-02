<?php
// database/seeders/JustificationSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JustificationSeeder extends Seeder
{
    public function run()
    {
        DB::table('justifications')->insert([
            [
                'student_id' => 1,  
                'session_id' => 1,  
                'description' => 'Medical leave for the session.',
                'status' => 'pending',  
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_id' => 2, 
                'session_id' => 2,    
                'description' => 'Family emergency.',
                'status' => 'approved',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
