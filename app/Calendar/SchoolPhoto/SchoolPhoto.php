<?php

namespace App\Calendar\School

use Illuminate\Database\Eloquent\Model;

class SchoolPhoto extends Model
{
		protected $fillable = ['filename','path','complete_path', 'complete_thumbnail_path', 'size', 'extension', 'mimetype', 'school_id', 'user_id'];

}
