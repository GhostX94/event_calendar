<?php  

 namespace App\Calendar\PersonPhoto;

 use App\Calendar\Base\BaseRepository;
 use App\Calendar\Upload\Upload;
 use App\Calendar\PersonPhoto\PersonPhoto;
 use Symfony\Component\HttpFoundation\File\UploadedFile;
/**
* 
*/
class PersonPhotoRepository extends BaseRepository
{
	protected $upload;
	function __construct()
	{
		  $this->setModel(new PersonPhoto);
	}
}
?>
