<?php  
	namespace App\Calendar\EventTarget;

	use App\Calendar\Base\BaseRepository;
	use App\Calendar\EventTarget\EventTarget;

	/**
	* 
	*/
	class EvenTargetRepository extends BaseRepository
	{
		
		public function __construct()
		{
			$this->setModel(new EventTarget);
		}


		public function update($data = array())
		{
			$eventType = $this->get($data['id']);
			$eventType->update($data);
			return $eventType;
		}

	}

?>