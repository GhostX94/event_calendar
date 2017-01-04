<?php

namespace App\Calendar\TypePerson;

use Illuminate\Database\Eloquent\Model;
use App\Calendar\SearchTrait;
use App\Calendar\SortTrait;

class TypePerson extends Model
{

	use SearchTrait, SortTrait;

    /**
     * The table associated with the model.
     *
     * @var string
    */
	public $table = 'type_persons';

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

    /**
     * Relationship
     */

    public function person()
    {
        return $this->hasOne(App\Calendar\Person\Person::class, 'type_person_id');
    }

}
