<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('groups')->insert([
            ['group_name' => 'DEV 101', 'branch_id' => 1, 'year_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['group_name' => 'DEV 102', 'branch_id' => 1, 'year_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['group_name' => 'DEVOWFS 201', 'branch_id' => 1, 'year_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['group_name' => 'DEVOWFS 206', 'branch_id' => 1, 'year_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            
            ['group_name' => 'ID 101', 'branch_id' => 2, 'year_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['group_name' => 'ID 102', 'branch_id' => 2, 'year_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['group_name' => 'IDC 203', 'branch_id' => 2, 'year_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['group_name' => 'IDC 205', 'branch_id' => 2, 'year_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            
            ['group_name' => 'GE 101', 'branch_id' => 3, 'year_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['group_name' => 'GE 102', 'branch_id' => 3, 'year_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['group_name' => 'GEC 203', 'branch_id' => 3, 'year_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['group_name' => 'GEC 205', 'branch_id' => 3, 'year_id' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['group_name' => 'GED 302', 'branch_id' => 3, 'year_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['group_name' => 'GED 307', 'branch_id' => 3, 'year_id' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);
        
    }
}
