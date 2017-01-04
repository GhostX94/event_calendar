<?php

namespace App\Calendar\State;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{

  	/**
     * The table associated with the model.
     *
     * @var string
    */
    public $table = 'states';

  	/**
     * The attributes that are mass assignable.
     *
     * @var array
    */
   protected $fillable = [
     'name',
   ];

	/**
	 * Relationship
	 */

}