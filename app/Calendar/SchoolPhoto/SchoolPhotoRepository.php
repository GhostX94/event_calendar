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
	/*
	public function remove($complete_path, $complete_thumbnail_path, $idPhoto)
	{
		if(\File::exists($complete_path) && \File::exists($complete_thumbnail_path))
		{
			\File::delete($complete_path);
			\File::delete($complete_thumbnail_path);
			parent::delete($idPhoto);
		}
	}*/
}
?>
