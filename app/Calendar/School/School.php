<?php

namespace App\Calendar\School;

use Illuminate\Database\Eloquent\Model;
use App\Calendar\SearchTrait;
use App\Calendar\SortTrait;

class School extends Model
{
	use SearchTrait, SortTrait;

	public $table = 'schools';

	protected $fillable = ['name'];

	protected $searchableColumns = [
		'name'
	];
}
