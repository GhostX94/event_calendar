<?php  
	namespace App\Calendar;

	trait SortTrait 
	{

		public function scopeSortBy($query, $field, $sortDir)
		{
			if(empty($field))
				return $query;

			$query->orderBy($field, $sortDir);

			return $query;
		}

	}

?>