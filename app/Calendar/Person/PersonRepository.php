<?php  
	namespace App\Calendar\Person;

	use App\Calendar\Base\BaseRepository;
	use App\Calendar\Person\Person;

	/**
	* 
	*/
	class PersonRepository extends BaseRepository
	{
		
		public function __construct()
		{
			$this->setModel(new Person);
		}


		public function update($data = array())
		{
			$person = $this->get($data['id']);
			$person->update($data);
			return $person;
		}

	}

?>
