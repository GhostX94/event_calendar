<?php  

 namespace App\Calendar\SchoolPhoto;

 use App\Calendar\Base\BaseRepository;
 use App\Calendar\Upload\Upload;
 use App\Calendar\SchoolPhoto\SchoolPhoto;
 use Symfony\Component\HttpFoundation\File\UploadedFile;
/**
* 
*/
class SchoolPhotoRepository extends BaseRepository
{
	protected $upload;
	function __construct()
	{
		  $this->setModel(new SchoolPhoto);
	}
	public function register(UploadedFile $file, $school_id, $user_id)
	{
		$this->upload = new Upload($file, 74, 103, 'storage/products/');
		$this->upload->process();
		$data = array('complete_path' => $this->upload->getCompletePublicFilePath(),
				'complete_thumbnail_path'=> $this->upload->getCompleteThumbnailPublicFilePath(),
				'filename' => $this->upload->getFileName(),
				'path' => $this->upload->getUploadPath(),
				'extension' => $this->upload->getFileExtension(),
				'size' => $this->upload->getSize(),
				'mimetype' => $this->upload->getMimeType(),
				'school_id' => $school_id,
				'user_id' => $user_id
			);
		parent::create($data);
	}
	public function remove($complete_path, $complete_thumbnail_path, $idPhoto)
	{
		if(\File::exists($complete_path) && \File::exists($complete_thumbnail_path))
		{
			\File::delete($complete_path);
			\File::delete($complete_thumbnail_path);
			parent::delete($idPhoto);
		}
	}
}
?>
