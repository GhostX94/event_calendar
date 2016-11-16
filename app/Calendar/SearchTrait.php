<?php  
	namespace App\Calendar;

	trait SearchTrait
	{
		public function scopeSearch($query, $string)
		{
        	$query->where( $this->table . '.' . $field, 'LIKE', $searchString );
		}
	}

?>
