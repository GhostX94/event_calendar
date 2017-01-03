<?php  
	namespace App\Calendar\TypePerson;

	use App\Calendar\Base\BaseRepository;
	use App\Calendar\TypePerson\TypePerson;

	/**
	* 
	*/
	class TypePersonRepository extends BaseRepository
	{
		
		public function __construct()
		{
			$this->setModel(new TypePerson);
		}


		public function update($data = array())
		{
			$typePerson = $this->get($data['id']);
			$typePerson->update($data);
			return $typePerson;
		}
	}

?>