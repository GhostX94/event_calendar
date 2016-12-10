<?php

namespace App\Calendar\School;

use Illuminate\Database\Eloquent\Model;
use App\Calendar\SearchTrait;
use App\Calendar\SortTrait;

class School extends Model
{
	use SearchTrait, SortTrait;

	/**
     * The table associated with the model.
     *
     * @var string
    */
	public $table = 'schools';

	/**
     * The attributes that are mass assignable.
     *
     * @var array
    */
	protected $fillable = ['name'];

	/**
     * 	The columns used for searches in each query.
     *
     * @var array
    */
	protected $searchableColumns = [
		'name'
	];
}
