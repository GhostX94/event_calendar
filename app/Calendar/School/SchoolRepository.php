<?php  
	namespace App\Calendar\School;

	use App\Calendar\Base\BaseRepository;
	use App\Calendar\School\School;

	/**
	* 
	*/
	class SchoolRepository extends BaseRepository
	{
		
		function __construct()
		{
			$this->setModel(new School);
		}
	}

?>

