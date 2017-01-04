<?php

use Illuminate\Database\Seeder;

class TownTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$towns[] = array(
    		'name' => 'San Cristóbal',
    		'state_id' => 1,
    	);  

    	$towns[] = array(
    		'name' => 'Guasimos',
    		'state_id' => 1,
    	);    

    	$towns[] = array(
    		'name' => 'Cardenas',
    		'state_id' => 1,
    	); 

    	$towns[] = array(
    		'name' => 'Ayacucho',
    		'state_id' => 1,
    	);  

    	$towns[] = array(
    		'name' => 'Alberto Adriani',
    		'state_id' => 2,
    	); 

    	$towns[] = array(
    		'name' => 'Andrés Bello',
    		'state_id' => 2,
    	);   

        // Uncomment the below to run the seeder
    	\DB::table('towns')->insert($towns);
    }
}
