<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Branch;

class BranchesTableSeeder extends Seeder
{
    public function run()
    {
       
        Branch::firstOrCreate(
            ['branch_name' => 'Development Digital'],
            ['created_at' => now(), 'updated_at' => now()]
        );

        Branch::firstOrCreate(
            ['branch_name' => 'Infrastructure Digital'],
            ['created_at' => now(), 'updated_at' => now()]
        );

        Branch::firstOrCreate(
            ['branch_name' => 'Gestion d\'Entreprise'],
            ['created_at' => now(), 'updated_at' => now()]
        );
    }
}

