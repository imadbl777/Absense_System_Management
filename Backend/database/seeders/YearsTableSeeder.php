<?php
namespace Database\Seeders;
// Database/Seeders/YearsTableSeeder.php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class YearsTableSeeder extends Seeder
{
    public function run()
    {
       
        $branches = DB::table('branches')->get();

        foreach ($branches as $branch) {
         
            $years = ($branch->branch_name == 'Gestion d\'Entreprise') ? [1, 2, 3] : [1, 2];

            foreach ($years as $year) {
                DB::table('years')->insert([
                    'branch_id' => $branch->branch_id,
                    'year_number' => $year,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
