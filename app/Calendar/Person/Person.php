<?php

namespace App\Calendar\Person;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{

	/**
     * The table associated with the model.
     *
     * @var string
    */
	public $table = 'persons';
  	
  	/**
     * The attributes that are mass assignable.
     *
     * @var array
    */
	protected $fillable = [
		'firts_name', 
		'last_name',
		'birthdate',
		'address',
		'phone',
		'user_id',
		'type_person_id',
		'town_id'
	];

	/**
	 * Relationship
	 */

	public function user()
	{
		 return $this->belongsTo(App\Calendar\User\User::class, 'user_id');
	}

	public function typePerson()
	{
		 return $this->belongsTo(App\Calendar\TypePerson\TypePerson::class, 
		 	'type_person_id');
	}

	public function town()
	{
		 return $this->belongsTo(App\Calendar\Town\Town::class, 'town_id');
	}

}
