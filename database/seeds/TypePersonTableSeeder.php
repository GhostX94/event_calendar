<?php

use Illuminate\Database\Seeder;
use App\Calendar\TypePerson\TypePerson;

class TypePersonTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $typePersons = [
       		'director', 
       		'profesor', 
       		'personal obrero', 
       		'personal administrativo'
       	];

       	foreach ($typePersons as $type) {
       		TypePerson::create(['name' => $type]);
       	}
    }
}
