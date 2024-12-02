<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
      public function up()
      {

            Schema::create('branches', function (Blueprint $table) {
                  $table->increments('branch_id');
                  $table->string('branch_name', 100)->unique();
                  $table->timestamps();
            });


            Schema::create('groups', function (Blueprint $table) {
                  $table->increments('group_id');
                  $table->string('group_name', 50)->unique();
                  $table->unsignedInteger('branch_id')->nullable();
                  $table->timestamps();

                  $table->foreign('branch_id')
                        ->references('branch_id')
                        ->on('branches')
                        ->onDelete('set null');
            });


            Schema::create('professors', function (Blueprint $table) {
                  $table->increments('prof_id');
                  $table->string('first_name', 50);
                  $table->string('last_name', 50);
                  $table->timestamps();
            });


            Schema::create('subjects', function (Blueprint $table) {
                  $table->increments('subject_id');
                  $table->string('subject_name', 100)->unique();
                  $table->unsignedInteger('branch_id')->nullable();
                  $table->timestamps();

                  $table->foreign('branch_id')
                        ->references('branch_id')
                        ->on('branches')
                        ->onDelete('set null');
            });


            Schema::create('professors_subjects', function (Blueprint $table) {
                  $table->increments('id');
                  $table->unsignedInteger('prof_id')->nullable();
                  $table->unsignedInteger('subject_id')->nullable();
                  $table->unsignedInteger('group_id')->nullable();
                  $table->timestamps();

                  $table->foreign('prof_id')
                        ->references('prof_id')
                        ->on('professors')
                        ->onDelete('set null');

                  $table->foreign('subject_id')
                        ->references('subject_id')
                        ->on('subjects')
                        ->onDelete('set null');

                  $table->foreign('group_id')
                        ->references('group_id')
                        ->on('groups')
                        ->onDelete('set null');
            });


            Schema::create('students', function (Blueprint $table) {
                  $table->increments('student_id');
                  $table->string('first_name', 50);
                  $table->string('last_name', 50);
                  $table->string('card_number', 20)->unique();
                  $table->unsignedInteger('branch_id')->nullable();
                  $table->unsignedInteger('group_id')->nullable();
                  $table->string('gmail', 100)->unique()->nullable();
                  $table->string('phone_number', 15)->nullable();
                  $table->timestamps();

                  $table->foreign('branch_id')
                        ->references('branch_id')
                        ->on('branches')
                        ->onDelete('set null');

                  $table->foreign('group_id')
                        ->references('group_id')
                        ->on('groups')
                        ->onDelete('set null');
            });


            Schema::create('sessions', function (Blueprint $table) {
                  $table->increments('session_id');
                  $table->unsignedInteger('subject_id')->nullable();
                  $table->unsignedInteger('group_id')->nullable();
                  $table->unsignedInteger('prof_id')->nullable();
                  $table->date('session_date');
                  $table->integer('session_hours');
                  $table->string('session_topic', 100)->nullable();
                  $table->timestamps();

                  $table->foreign('subject_id')
                        ->references('subject_id')
                        ->on('subjects')
                        ->onDelete('set null');

                  $table->foreign('group_id')
                        ->references('group_id')
                        ->on('groups')
                        ->onDelete('set null');

                  $table->foreign('prof_id')
                        ->references('prof_id')
                        ->on('professors')
                        ->onDelete('set null');
            });


            Schema::create('attendance', function (Blueprint $table) {
                  $table->increments('attendance_id');
                  $table->unsignedInteger('session_id')->nullable();
                  $table->unsignedInteger('student_id')->nullable();
                  $table->boolean('attended')->default(0);
                  $table->timestamps();

                  $table->foreign('session_id')
                        ->references('session_id')
                        ->on('sessions')
                        ->onDelete('set null');

                  $table->foreign('student_id')
                        ->references('student_id')
                        ->on('students')
                        ->onDelete('set null');
            });

            Schema::create('warnings', function (Blueprint $table) {
                  $table->increments('warning_id');
                  $table->unsignedInteger('student_id')->nullable();
                  $table->integer('missed_hours')->nullable();
                  $table->date('warning_date');
                  $table->string('reason', 255)->nullable();
                  $table->timestamps();

                  $table->foreign('student_id')
                        ->references('student_id')
                        ->on('students')
                        ->onDelete('set null');
            });
      }

      public function down()
      {

            Schema::dropIfExists('warnings');
            Schema::dropIfExists('attendance');
            Schema::dropIfExists('sessions');
            Schema::dropIfExists('students');
            Schema::dropIfExists('professors_subjects');
            Schema::dropIfExists('subjects');
            Schema::dropIfExists('professors');
            Schema::dropIfExists('groups');
            Schema::dropIfExists('branches');
      }
};