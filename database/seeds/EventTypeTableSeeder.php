<?php

use Illuminate\Database\Seeder;

class EventTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
   		factory(App\Calendar\EventType\EventType::class, 3)->create();
    }
}
