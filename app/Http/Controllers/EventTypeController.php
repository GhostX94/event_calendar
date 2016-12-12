<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Calendar\EventType\EventTypeRepository;

class EventTypeController extends Controller
{
    private $repository; 

    public function __construct(EventTypeRepository $eventTypeRepository)
    {
   		$this->repository = $eventTypeRepository;
    }
}
