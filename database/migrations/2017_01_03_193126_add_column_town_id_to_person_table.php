<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnTownIdToPersonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('persons', function (Blueprint $table) {
           $table->integer('town_id')->unsigned()->after('type_person_id');
           $table->foreign('town_id')
            ->references('id')
            ->on('towns')
            ->onUpdate('cascade')
            ->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('persons', function (Blueprint $table) {
            $table->dropForeign('persons_town_id_foreign');
            $table->dropColumn('town_id');
        });
    }
}
