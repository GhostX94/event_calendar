<?php

namespace App\Calendar\School;

use Illuminate\Database\Eloquent\Model;

class SchoolPhoto extends Model
{
	public $table = 'schools_photos';

	protected $fillable = ['filename','path','complete_path', 'complete_thumbnail_path', 'size', 'extension', 'mimetype', 'school_id', 'user_id'];
}
