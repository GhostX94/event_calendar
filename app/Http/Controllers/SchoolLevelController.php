<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Calendar\SchoolLevel\SchoolLevel;
use App\Calendar\SchoolLevel\SchoolLevelRepository;
use App\Http\Requests\CreateSchoolLevelRequest;
use App\Http\Requests\EditSchoolLevelRequest;
use App\Http\Controllers\DataFormat;

class SchoolLevelController extends Controller
{
	use DataFormat;  

	private $repository;

    public function __construct(SchoolLevelRepository $schoolLevelRepository)
    {
    	$this->repository = $schoolLevelRepository;
    }

    public function index(Request $request)
	{
		if (request()->ajax()) 
		{
			if (request()->has('sort')) 
			{
				list($sortCol, $sortDir) = explode('|', request()->sort);
				if(\Schema::hasColumn('schools', $sortCol))
					$query = SchoolLevel::orderBy($sortCol, $sortDir);
				else
					$query = SchoolLevel::sortBy($sortCol, $sortDir);
			}else{
				$query = SchoolLevel::orderBy('created_at', 'asc');
			}

			if ($request->exists('filter')) {
				$query->search("{$request->filter}");
			}

			$perPage = request()->has('per_page') ? (int) request()->per_page : null;
			$result = $query->paginate($perPage);

			return response()->json($result);
		}	
	}

	public function store(CreateSchoolLevelRequest $request)
	{
		if (request()->ajax()) 
		{
			$data = array();
			$input = $request->all();
			$schoolLevel = $this->repository->create($input);
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'School Level saved');
			$this->addToResponseArray('data', $schoolLevel->toArray());
			$this->addToResponseArray('request', $input);
			return $this->getResponseArrayJson();
		}
	}

	public function show(Request $request, $id)
	{
		if (request()->ajax()) 
		{
			$schoolLevel = $this->repository->get($id);
			if (empty($schoolLevel)) {
				$this->addToResponseArray('message', 'School Level not found');
				return $this->getResponseArrayJson();
			}
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'School Level data retrieved correctly');
			$this->addToResponseArray('data', $schoolLevel->toArray());
			return $this->getResponseArrayJson();
		}
	}

	public function update($id, EditSchoolLevelRequest $request)
	{
		if (request()->ajax()) 
		{
			$input = $request->all();
			$schoolLevel = $this->repository->update($input);
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'School Level update');
			$this->addToResponseArray('data', $schoolLevel->toArray());
			return $this->getResponseArrayJson();
		}
	}

	public function destroy($id, Request $request)
	{
		if (request()->ajax()) 
		{
			$input = $request->all();
			$this->setSuccess($this->repository->delete($id));
			$this->addToResponseArray('message', 'School Level delete');
			return $this->getResponseArrayJson(); 
		}
	}

}
