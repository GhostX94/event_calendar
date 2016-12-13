<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Calendar\School\SchoolRepository;
use App\Calendar\School\School;
use App\Calendar\SchoolPhoto\SchoolPhotoRepository;
use App\Http\Requests\CreateSchoolRequest;
use App\Http\Requests\EditSchoolRequest;

class SchoolController extends Controller
{
	private $repository;
	private $schoolPhotoRepository;

	public function __construct(SchoolRepository $schoolRepository, 
		SchoolPhotoRepository $schoolPhotoRepository){
		$this->schoolPhotoRepository = $schoolPhotoRepository;
		$this->repository = $schoolRepository;
	}

	public function index(Request $request)
	{
		if (request()->ajax()) 
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

	public function store(CreateSchoolRequest $request)
	{
		if (request()->ajax()) 
		{
			$data = array();
			$input = $request->all();
			$school = $this->repository->create($input);
			$data['school_id'] = $school->id;
			if ($request->hasFile('image')) {
				$this->schoolPhotoRepository->registerImage($request->file('image'), 
					'storage/schools/', 
					$data
				);
			}
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'School saved');
			$this->addToResponseArray('data', $school->toArray());
			$this->addToResponseArray('request', $input);
			return $this->getResponseArrayJson();
		}
	}

	public function show(Request $request, $id)
	{
		if (request()->ajax()) 
		{
			$school = $this->repository->get($id);
			if (empty($school)) {
				$this->addToResponseArray('message', 'School not found');
				return $this->getResponseArrayJson();
			}
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'School data retrieved correctly');
			$this->addToResponseArray('data', $school->toArray());
			if($school->hasPhotos())
				$this->addToResponseArray('imageUrl', $school->first_photo->complete_path);
			return $this->getResponseArrayJson();
		}
	}

	public function update($id, CreateSchoolRequest $request)
	{
		if (request()->ajax()) 
		{
			$input = $request->all();
			$school = $this->repository->update($input);
			$data['school_id'] = $school->id;
			if($request->hasFile('image'))
			{
				if ($school->hasPhotos()) 
				{
					$this->schoolPhotoRepository->removeImage(
							$school->first_photo->complete_path, 
							$school->first_photo->complete_thumbnail_path, 
							$school->first_photo->id
						); 
				}
				$this->schoolPhotoRepository->registerImage($request->file('image'), 
					'storage/schools/', 
					$data
				);
			}
			$this->setSuccess(true);
			$this->addToResponseArray('message', 'School update');
			$this->addToResponseArray('data', $school->toArray());
			return $this->getResponseArrayJson();
		}
	}

	public function destroy($id, Request $request)
	{
		if (request()->ajax()) 
		{
			$input = $request->all();
			$school = $this->repository->get($id);
            if ($school->hasPhotos()) 
            {
                foreach ($school->photos as $photo) 
                {
                    $this->schoolPhotoRepository->removeImage(
                        $photo->complete_path, 
                        $photo->complete_thumbnail_path, 
                        $photo->id
                    );
                }
            }
			$this->setSuccess($this->repository->delete($id));
			$this->addToResponseArray('message', 'School delete');
			return $this->getResponseArrayJson(); 
		}
	}
}
