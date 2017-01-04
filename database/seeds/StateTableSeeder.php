<?php

use Illuminate\Database\Seeder;
use App\Calendar\State\State;
class StateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      	$states = ['Táchira', 'Mérida'];

      	foreach ($states as $state) {
      		State::create(['name' => $state]);
      	}
    }
}
