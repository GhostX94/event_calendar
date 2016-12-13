<?php  
	namespace App\Calendar\SchoolLevel;

	use App\Calendar\Base\BaseRepository;
	use App\Calendar\SchoolLevel\SchoolLevel;

	/**
	* 
	*/
	class SchoolLevelRepository extends BaseRepository
	{
		
		public function __construct()
		{
			$this->setModel(new SchoolLevel);
		}


		public function update($data = array())
		{
			$schoolLevel = $this->get($data['id']);
			$schoolLevel->update($data);
			return $schoolLevel;
		}

	}

?>
