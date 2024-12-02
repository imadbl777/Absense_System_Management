<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin_notifications', function (Blueprint $table) {
            $table->increments('notification_id'); 
            $table->unsignedInteger('student_id')->nullable(); 
            $table->unsignedInteger('session_id')->nullable();
            $table->string('type', 50)->default('justification');
            $table->text('message');
            $table->boolean('is_read')->default(false);
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

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admin_notifications');
    }
}
