<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePersonsPhotoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('person_photo', function (Blueprint $table) {
            $table->increments('id');
            $table->string('filename');
            $table->string('path');
            $table->string('complete_path');
            $table->string('complete_thumbnail_path');
            $table->integer('size');
            $table->string('extension', 3);
            $table->string('mimetype', 32);
            $table->integer('person_id')->unsigned();
            $table->foreign('person_id')
                ->references('id')->on('persons')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('person_photo');
    }
}
