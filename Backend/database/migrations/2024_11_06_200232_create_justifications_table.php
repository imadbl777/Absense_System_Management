<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('justifications', function (Blueprint $table) {
            $table->increments('justification_id');
            $table->unsignedInteger('student_id')->nullable();
            $table->unsignedInteger('session_id')->nullable();
            $table->string('description', 255);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('admin_comment', 255)->nullable();
            $table->string('document_path', 255)->nullable(); 
            $table->timestamp('submitted_at')->useCurrent();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->foreign('student_id')
                  ->references('student_id')
                  ->on('students')
                  ->onDelete('set null');
                  
            $table->foreign('session_id')
                  ->references('session_id')
                  ->on('sessions')
                  ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('justifications');
    }
};