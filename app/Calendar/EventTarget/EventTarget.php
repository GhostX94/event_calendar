<?php

namespace App\Calendar\EventTarget;

use Illuminate\Database\Eloquent\Model;
use App\Calendar\SearchTrait;
use App\Calendar\SortTrait;

class EventTarget extends Model
{
	use SearchTrait, SortTrait;

}
