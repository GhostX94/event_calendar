<?php  
	namespace App\Calendar\Town;

	use App\Calendar\Base\BaseRepository;
	use App\Calendar\Town\Town;

	/**
	* 
	*/
	class TownRepository extends BaseRepository
	{
		
		public function __construct()
		{
			$this->setModel(new Town);
		}


		public function update($data = array())
		{
			$person = $this->get($data['id']);
			$person->update($data);
			return $person;
		}

	}

?>