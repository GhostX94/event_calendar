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
	protected $fillable = ['name', 'school_level_id'];

	/**
     * 	The columns used for searches in each query.
     *
     * @var array
    */
	protected $searchableColumns = [
		'name'
	];

	/**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['school_level_name'];

	/**
	 * Get the picture for school.
	*/
	public function photos()
	{
		return $this->hasMany('App\Calendar\SchoolPhoto\SchoolPhoto', 'school_id');
	}

	/**
	 * Get the school level for school.
	*/
	public function schoolLevel()
	{
		return $this->belongsTo('App\Calendar\SchoolLevel\SchoolLevel', 'school_level_id');
	}


	/**
	 *  Check if there are photos associated with the model.
	*/
	public function hasPhotos()
	{
		return $this->photos->count();
	}


	/**
	 *  Return the first photo associated with the model.
	*/
	public function getFirstPhotoAttribute()
    {
        if ($this->hasPhotos()) {
            foreach ($this->photos as $photo) {
                return $photo;
            }
        }
        return false;
    }

    /**
     * Return the school level name for the school.
     */

    public function getSchoolLevelNameAttribute()
    {
    	if ($this->schoolLevel)
    		return $this->schoolLevel->name;
    	return false;
    }

}
