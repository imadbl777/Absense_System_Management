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
            'branch_id' => Branch::inRandomOrder()->value('branch_id'),
            'group_id' => Group::inRandomOrder()->value('group_id'),
            'gmail' => $this->faker->unique()->safeEmail,
            'phone_number' => $this->faker->numerify('06#############'),
            'password' => '12345',
            'mark' => 20
        ];
    }
}