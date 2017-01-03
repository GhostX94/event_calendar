<?php

use Illuminate\Database\Seeder;
use App\Calendar\User\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		//factory(App\Calendar\User\User::class, 10)->create();
		$users = [];

		$users [] = [
	        'name' => 'ajpadilla88',
	        'email' => 'ajpadilla88@gmail.com',
	        'password' => $password ?: $password = bcrypt('secret'),
	        'remember_token' => str_random(10),
    	];

    	$users [] = [
	        'name' => 'tego_07_07',
	        'email' => 'tego_07_07@hotmail.com',
	        'password' => $password ?: $password = bcrypt('secret'),
	        'remember_token' => str_random(10),
    	];

    	foreach ($users as $user) {
    		User::create($user);
    	}

    }
}
