<?php

namespace App\Calendar\School;

use Illuminate\Database\Eloquent\Model;

class School extends Model
{

	public $table = 'schools';
	protected $fillable = ['name'];
}
