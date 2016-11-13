<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Calendar\School\SchoolRepository;

private $repository;

class SchoolController extends Controller
{
   public function __construct(SchoolRepository $schoolRepository)
   {
		$this->repository = $schoolRepository;
   }
}
