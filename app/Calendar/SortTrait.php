<?php  
namespace App\Calendar;

trait SortTrait 
{

	public function scopeSortBy($query, $field, $sortDir)
	{
		if ( empty ( $field ) )
			return $query;

		$argLength = count ( explode ('.', $field) );
		if ( $argLength > 1 ) {
			if ( $argLength == 2 ) {
				list($relation, $field) = explode('.', $field);

				$tableRelation = explode('-', $relation);

				if ( count ( $tableRelation ) > 1 ) {
					$relation = $tableRelation[0];
					$table = $tableRelation[1];
				} else {
					$table = str_plural($relation);                    
				}
				
				$query->join(
					$table, 
					$this->table . '.' . $relation . '_id', 
					'=', 
					$table . '.id'
					)
				->orderBy($table . '.' . $field, $sortDir);
			} else {
				list($relation1, $relation2, $field) = explode('.', $field);
				$table1 = str_plural ( $relation1 );
				$table2 = str_plural ( $relation2 );

				$query->join(
					$table1, 
					$this->table . '.' . $relation1 . '_id',
					'=',
					$table1. '.id'
					)
				->join(
					$table2, 
					$table1 . '.' . $relation2 . '_id',
					'=',
					$table2. '.id'
					)
				->orderBy($table2 . '.' . $field, $sortDir);
			}  
			$query->select($this->table . '.*');        
		} else {
			$query->orderBy($field, $sortDir);
		}        
		return $query;
	}

}

?>