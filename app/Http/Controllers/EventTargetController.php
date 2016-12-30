<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Calendar\EventTarget\EventTarget;
use App\Calendar\EventTarget\EvenTargetRepository;
use App\Http\Requests\CreateEventTargetRequest;
use App\Http\Requests\EditEventTargetRequest;

class EventTargetController extends Controller
{

	private $repository; 

    public function __construct(EvenTargetRepository $evenTargetRepository)
    {
   		$this->repository = $evenTargetRepository;
    }

    public function index(Request $request)
	{
		if (request()->ajax()) 
		{
			if (request()->has('sort')) 
			{
				list($sortCol, $sortDir) = explode('|', request()->sort);
				if(\Schema::hasColumn('event_types', $sortCol))
					$query = EventTarget::orderBy($sortCol, $sortDir);
				else
					$query = EventTarget::sortBy($sortCol, $sortDir);
			}else{
				$query = EventTarget::orderBy('created_at', 'asc');
			}

			if ($request->exists('filter')) {
				$query->search("{$request->filter}");
			}

			$perPage = request()->has('per_page') ? (int) request()->per_page : null;
			$result = $query->paginate($perPage);

			return response()->json($result);
		}	
	}

	public function store(CreateEventTargetRequest $request)
	{
		if (request()->ajax()) 
		{
			$data = array();
			$input = $request->all();
			$school = $this->repository->create($input);
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'Event target saved');
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
				$this->addToResponseArray('message', 'Event target not found');
				return $this->getResponseArrayJson();
			}
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'Event target data retrieved correctly');
			$this->addToResponseArray('data', $eventType->toArray());
			return $this->getResponseArrayJson();
		}
	}

	public function update($id, EditEventTargetRequest $request)
	{
		if (request()->ajax()) 
		{
			$input = $request->all();
			$eventType = $this->repository->update($input);
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'Event target update');
			$this->addToResponseArray('data', $eventType->toArray());
			return $this->getResponseArrayJson();
		}
	}

	public function destroy($id, Request $request)
	{
		if (request()->ajax()) 
		{
			$input = $request->all();
			$this->setSuccess($this->repository->delete($id));
			$this->addToResponseArray('message', 'Event target delete');
			return $this->getResponseArrayJson(); 
		}
	}


}
