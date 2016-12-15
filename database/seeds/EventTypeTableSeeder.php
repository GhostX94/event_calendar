<?php

use Illuminate\Database\Seeder;
use App\Calendar\EventType\EventType;

class EventTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$names = [
        	'Informativo',
        	'Escolar',
        	'Caridad',
    	];

    	for ($i=0; $i < count($names) ; $i++) { 
    		EventType::create(['name' => $names[$i]]);
    	}
   		//factory(App\Calendar\EventType\EventType::class, 3)->create();
    }
}
