<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Calendar\School\SchoolRepository;

class SchoolController extends Controller
{
	private $repository;
	public function __construct(SchoolRepository $schoolRepository)
	{
		$this->repository = $schoolRepository;
	}

	public function index(Request $request)
	{
		return response()->json(['data'=> request()->all()]);
	}

}
