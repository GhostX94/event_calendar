<?php  
	
	namespace App\Calendar\Base;
	
	class BaseRepository
	{
		protected $model;
	  
	    public function setModel($model)
	    {
	    	$this->model = $model;
	    }

	    public function getModel()
		{
			return $this->model;
		}

		public function create($data = array())
		{
			$model = $this->model->create($data); 
			return $model;
		}

		public function  getAll($exclude = null)
		{
			if($exclude)
				return $this->getModel()->whereNotIn('id', $exclude)->get();
			return $this->getModel()->all();
		}

		public function getAllForSelect()
		{
			return $this->getAll()->lists('name', 'id');
		}

		public function get($id)
		{
			return $this->model->findOrFail($id);
		}

		public function delete($id)
		{
			$model = $this->get($id); 
			return $model->delete();
		}
		
		public function update($data = array()){}
	}

?>
