<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Calendar\User\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});


$factory->define(App\Calendar\School\School::class, function (Faker\Generator $faker){
	return[
		'name' => $faker->unique()->name,
	];
});

$factory->define(App\Calendar\EventType\EventType::class, function (Faker\Generator $faker){

    $names = [
        'Informativo',
        'Escolar',
        'Caridad',
    ];
    $i = $faker->unique()->numberBetween(0, 2);
    return[
        'name' => $names[$i],
    ];
});

$factory->define(App\Calendar\SchoolLevel\SchoolLevel::class, function (Faker\Generator $faker){

    $names = [
        'Primaria',
        'Secundaria',
        'Preparatoria',
    ];
    $i = $faker->unique()->numberBetween(0, 2);
    return[
        'name' => $names[$i],
    ];
});