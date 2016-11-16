<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Calendar\School\SchoolRepository;
use App\Calendar\School\School;

class SchoolController extends Controller
{
	private $repository;
	public function __construct(SchoolRepository $schoolRepository)
	{
		$this->repository = $schoolRepository;
	}

	public function index(Request $request)
	{
		if (request()->has('sort')) 
		{
			list($sortCol, $sortDir) = explode('|', request()->sort);
			if(\Schema::hasColumn('schools', $sortCol))
				$query = School::orderBy($sortCol, $sortDir);
			else
				$query = School::sortBy($sortCol, $sortDir);
		}else{
			$query = School::orderBy('created_at', 'asc');
		}

		if ($request->exists('filter')) {
			$query->search("{$request->filter}");
		}

		$perPage = request()->has('per_page') ? (int) request()->per_page : null;
		$result = $query->paginate($perPage);

		return response()->json($result);
	}

}
