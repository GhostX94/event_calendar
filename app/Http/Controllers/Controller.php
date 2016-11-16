<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $responseArray = ['success' => false];

    public function setSuccess($success = false)
	{
		$this->responseArray['success'] = $success;
	}

	public function getResponseArray()
	{
		return $this->responseArray;
	}

	public function getResponseArrayJson()
	{
		return response()->json($this->responseArray);
	}

	public function addToResponseArray($key, $value)
	{
		$this->responseArray[$key] = $value;
	}
}
