<?php  
	namespace App\Http\Controllers;

	use Illuminate\Http\Request;

	trait DataFormat {
	    public function selectList(Request $request) {
	        $this->addToResponseArray('data', $this->repository->getSelectList()->toArray());
			return $this->getResponseArrayJson();
	    }	
	}

?>