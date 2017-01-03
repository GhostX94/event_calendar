<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Calendar\TypePerson\TypePerson;
use App\Calendar\TypePerson\TypePersonRepository;
use App\Http\Requests\CreateTypePersonRequest;
use App\Http\Requests\EditTypePersonRequest;

class TypePersonController extends Controller
{
	private $repository; 

	public function __construct(TypePersonRepository $typePersonRepository)
	{
		$this->repository = $typePersonRepository;
	}

	public function index(Request $request)
	{
		if (request()->ajax()) 
		{
			if (request()->has('sort')) 
			{
				list($sortCol, $sortDir) = explode('|', request()->sort);
				if(\Schema::hasColumn('event_types', $sortCol))
					$query = TypePerson::orderBy($sortCol, $sortDir);
				else
					$query = TypePerson::sortBy($sortCol, $sortDir);
			}else{
				$query = TypePerson::orderBy('created_at', 'asc');
			}

			if ($request->exists('filter')) {
				$query->search("{$request->filter}");
			}

			$perPage = request()->has('per_page') ? (int) request()->per_page : null;
			$result = $query->paginate($perPage);

			return response()->json($result);
		}	
	}

	public function store(CreateTypePersonRequest $request)
	{
		if (request()->ajax()) 
		{
			$data = array();
			$input = $request->all();
			$school = $this->repository->create($input);
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'Type person saved');
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
				$this->addToResponseArray('message', 'Type person not found');
				return $this->getResponseArrayJson();
			}
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'Type person data retrieved correctly');
			$this->addToResponseArray('data', $eventType->toArray());
			return $this->getResponseArrayJson();
		}
	}

	public function update($id, EditTypePersonRequest $request)
	{
		if (request()->ajax()) 
		{
			$input = $request->all();
			$eventType = $this->repository->update($input);
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'Type person update');
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
			$this->addToResponseArray('message', 'Type person delete');
			return $this->getResponseArrayJson(); 
		}
	}

}
