<?php  
	namespace App\Calendar\EventType;

	use App\Calendar\Base\BaseRepository;
	use App\Calendar\EventType\EventType;

	/**
	* 
	*/
	class EventTypeRepository extends BaseRepository
	{
		
		public function __construct()
		{
			$this->setModel(new EventType);
		}


		public function update($data = array())
		{
			$eventType = $this->get($data['id']);
			$eventType->update($data);
			return $eventType;
		}

	}

?>

