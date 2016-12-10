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
}
?>
