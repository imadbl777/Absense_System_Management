<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('years', function (Blueprint $table) {
            $table->increments('year_id');
            $table->unsignedInteger('branch_id');
            $table->integer('year_number');
            $table->timestamps();

            $table->foreign('branch_id')->references('branch_id')->on('branches')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('years');
    }
};
