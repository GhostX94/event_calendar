<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Calendar\SchoolLevel\SchoolLevel;
use App\Calendar\SchoolLevel\SchoolLevelRepository;

class SchoolLevelController extends Controller
{
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

	public function store(CreateSchoolRequest $request)
	{
		if (request()->ajax()) 
		{
			$data = array();
			$input = $request->all();
			$schoolLevel = $this->repository->create($input);
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'School saved');
			$this->addToResponseArray('data', $schoolLevel->toArray());
			$this->addToResponseArray('request', $input);
			return $this->getResponseArrayJson();
		}
	}
}
