<?php

use Illuminate\Database\Seeder;

class SchoolLevelTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
   		factory(App\Calendar\SchoolLevel\SchoolLevel::class, 3)->create();
    }
}
