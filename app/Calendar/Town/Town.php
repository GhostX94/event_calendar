<?php

namespace App\Calendar\Town;

use Illuminate\Database\Eloquent\Model;

class Town extends Model
{
  	
  	/**
     * The table associated with the model.
     *
     * @var string
    */
	public $table = 'towns';

  	/**
     * The attributes that are mass assignable.
     *
     * @var array
    */
	protected $fillable = [
		'name',
		'state_id' 
	];

	/**
	 * Relationship
	 */

	public function person()
    {
    	return $this->hasOne(App\Calendar\Person\Person::class, 'town_id');
    }

}