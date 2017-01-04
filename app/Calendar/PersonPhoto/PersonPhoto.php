<?php

namespace App\Calendar\PersonPhoto;

use Illuminate\Database\Eloquent\Model;

class PersonPhoto extends Model
{
	public $table = 'person_photo';

	protected $fillable = [
		'filename',
		'path',
		'complete_path', 
		'complete_thumbnail_path', 
		'size', 
		'extension', 
		'mimetype', 
		'person_id'
	];
}
