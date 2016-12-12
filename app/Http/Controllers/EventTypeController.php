<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Calendar\EventType\EventTypeRepository;
use App\Calendar\EventType\EventType;
use App\Http\Requests\CreateEventTypeRequest;

class EventTypeController extends Controller
{
    private $repository; 

    public function __construct(EventTypeRepository $eventTypeRepository)
    {
   		$this->repository = $eventTypeRepository;
    }

    public function index(Request $request)
	{
		if (request()->ajax()) 
		{
			if (request()->has('sort')) 
			{
				list($sortCol, $sortDir) = explode('|', request()->sort);
				if(\Schema::hasColumn('event_types', $sortCol))
					$query = EventType::orderBy($sortCol, $sortDir);
				else
					$query = EventType::sortBy($sortCol, $sortDir);
			}else{
				$query = EventType::orderBy('created_at', 'asc');
			}

			if ($request->exists('filter')) {
				$query->search("{$request->filter}");
			}

			$perPage = request()->has('per_page') ? (int) request()->per_page : null;
			$result = $query->paginate($perPage);

			return response()->json($result);
		}	
	}

	public function store(CreateEventTypeRequest $request)
	{
		if (request()->ajax()) 
		{
			$data = array();
			$input = $request->all();
			$school = $this->repository->create($input);
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'Event type saved');
			$this->addToResponseArray('data', $school->toArray());
			$this->addToResponseArray('request', $input);
			return $this->getResponseArrayJson();
		}
	}

	public function show(Request $request, $id)
	{
		if (request()->ajax()) 
		{
			$eventType = $this->repository->get($id);
			if (empty($eventType)) {
				$this->addToResponseArray('message', 'Event Type not found');
				return $this->getResponseArrayJson();
			}
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'Event Type data retrieved correctly');
			$this->addToResponseArray('data', $eventType->toArray());
			return $this->getResponseArrayJson();
		}
	}

	public function update($id, Request $request)
	{
		if (request()->ajax()) 
		{
			$input = $request->all();
			$eventType = $this->repository->update($input);
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'Event Type update');
			$this->addToResponseArray('data', $eventType->toArray());
			return $this->getResponseArrayJson();
		}
	}

}