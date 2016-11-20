<?php  
	namespace App\Calendar\School;

	use App\Calendar\Base\BaseRepository;
	use App\Calendar\School\School;

	/**
	* 
	*/
	class SchoolRepository extends BaseRepository
	{
		
		public function __construct()
		{
			$this->setModel(new School);
		}


		public function update($data = array())
		{
			$school = $this->get($data['id']);
			$school->update($data);
			return $school;
		}

	}

?>

