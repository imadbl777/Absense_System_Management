<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $primaryKey = 'branch_id';
    
    protected $fillable = [
        'branch_name'
    ];

    public function groups()
    {
        return $this->hasMany(Group::class, 'branch_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'branch_id');
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class, 'branch_id');
    }
}
