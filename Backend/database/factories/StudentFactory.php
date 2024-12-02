<?php
namespace Database\Factories;

use App\Models\Branch;
use App\Models\Group;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'card_number' => $this->faker->unique()->numerify('##############'),

            // Option 1: If you want to allow random branch selection
            'branch_id' => Branch::inRandomOrder()->value('branch_id'),

            // Option 2: If you want to use explicitly passed branch_id
            // 'branch_id' => null, // This will be set in the seeder

            // Option 1: If you want to allow random group selection
            'group_id' => Group::inRandomOrder()->value('group_id'),

            // Option 2: If you want to use explicitly passed group_id
            // 'group_id' => null, // This will be set in the seeder

            'gmail' => $this->faker->unique()->safeEmail,
            'phone_number' => $this->faker->numerify('06#############'),
            'password' => '12345', // Use bcrypt for password hashing
            'grade' => rand(1, 20)
        ];
    }
}