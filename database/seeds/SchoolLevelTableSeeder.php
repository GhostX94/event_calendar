<?php

use Illuminate\Database\Seeder;
use App\Calendar\SchoolLevel\SchoolLevel;

class SchoolLevelTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$names = [
        	'Primaria',
        	'Secundaria',
        	'Preparatoria',
    	];	

    	for ($i=0; $i < count($names); $i++) { 
    		SchoolLevel::create(['name' => $names[$i]]);
    	}

   		//factory(App\Calendar\SchoolLevel\SchoolLevel::class, 3)->create();
    }
}
