<?php  
	namespace App\Calendar;

	trait SearchTrait
	{
		public function scopeSearch($query, $string)
	    {
	        if ( empty ( $string ) || !strlen ( $string ) )
	            return $query;
	        
	        $i = 0;
	        $searchString = "%$string%";
	        foreach ($this->searchableColumns as $key => $field) {
	            if ( is_array ( $field ) ) {                
	                $fields = $field;
	                $relation = $table = $key;
	                if (key_exists( 'table', $fields )) {
	                    $table = $fields['table'];
	                    unset ( $fields['table'] );
	                }
	                $where = 'orWhereHas';
	                if ( $i == 0)
	                    $where = 'whereHas';
	                $query->$where($relation, function($q) use ($searchString, $relation, $fields, $table) {
	                    foreach ($fields as $relationField)   
	                            $q->where($table . '.' . $relationField, "LIKE", $searchString);
	                });    
	                $query->select($this->table . '.*');
	            } else {
	                $where = 'orWhere';
	                if ( $i == 0)
	                    $where = 'where';                    
	                $query->$where( $this->table . '.' . $field, 'LIKE', $searchString );
	            }
	            $i = 1;
	        }
	        return $query;
	    }
	}

?>
