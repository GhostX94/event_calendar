<?php  
	namespace App\Calendar;

	trait SearchTrait
	{
		public function scopeSearch($query, $string)
		{
			$searchString = "%$string%";
			foreach ($this->searchableColumns as $key => $field) {
				if (is_array($field)) {
					return 0;
				}else{
					$query->where( $this->table . '.' . $field, 'LIKE', $searchString );
				}
			}
			return $query;
		}
	}

?>
