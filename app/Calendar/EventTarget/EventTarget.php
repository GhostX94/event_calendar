<?php

namespace App\Calendar\EventTarget;

use Illuminate\Database\Eloquent\Model;
use App\Calendar\SearchTrait;
use App\Calendar\SortTrait;

class EventTarget extends Model
{
	use SearchTrait, SortTrait;

	/**
     * The table associated with the model.
     *
     * @var string
    */
	public $table = 'event_targets';

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
