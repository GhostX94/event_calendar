<?php  
	
	namespace App\Calendar\Base;
	
	use App\Calendar\Upload\Upload;
 	use Symfony\Component\HttpFoundation\File\UploadedFile;

	class BaseRepository
	{
		protected $model;
		protected $upload;
	  
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

		public function getSelectList()
		{
			return $this->getAll()->pluck('name', 'id');
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

		public function registerImage(UploadedFile $file, $publicFilePath = '', $data = array())
		{
			$this->upload = new Upload($file, 74, 103, $publicFilePath);
			$this->upload->process();
			$result = array_merge($data,[
				'complete_path' => $this->upload->getCompletePublicFilePath(),
				'complete_thumbnail_path'=> $this->upload->getCompleteThumbnailPublicFilePath(),
				'filename' => $this->upload->getFileName(),
				'path' => $this->upload->getUploadPath(),
				'extension' => $this->upload->getFileExtension(),
				'size' => $this->upload->getSize(),
				'mimetype' => $this->upload->getMimeType(),
			]);
			$this->create($result);
		}

		public function removeImage($complete_path, $complete_thumbnail_path, $idPhoto)
		{
			if(\File::exists($complete_path) && \File::exists($complete_thumbnail_path))
			{
				\File::delete($complete_path);
				\File::delete($complete_thumbnail_path);
				$this->delete($idPhoto);
			}
		}
		
		public function update($data = array()){}
	}

?>
