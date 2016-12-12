<?php  

	namespace App\Calendar\Upload;

	use DateTime;
	use Intervention\Image\Facades\Image;
	use Symfony\Component\HttpFoundation\File\UploadedFile;
	
	class Upload
	{
		private $file;
		private $fileName;
		private $fileNameInDir;
		private $thumbnailFileNameInDir;
		private $fileExtension;
		private $size;
		private $mimeType;
		private $uploadPath;
		private $publicFilePath;
		private $thumbnailWidth;
		private $thumbnailHeight;
		
		function __construct(UploadedFile $file, $thumbnailWidth = 74, $thumbnailHeight = 103, $publicFilePath = '')
		{
			$this->file = $file;
			$this->fileName = substr($file->getClientOriginalName(), 0, -4);
			$this->fileExtension = 'jpg';
			$this->size = $file->getSize();
			$this->mimeType = $file->getMimeType();
			$this->thumbnailWidth = $thumbnailWidth;
			$this->thumbnailHeight = $thumbnailHeight;
			$this->publicFilePath = $publicFilePath;
			$this->uploadPath = $this->publicFilePath;
		}
		public function process(){
			$date = new DateTime();
			$fileName = $this->fileName . '-' . $date->format('dmyhms') . '.' . $this->fileExtension;
			$thumbnailFileName = 'thumb-' . $this->fileName . '-' . $date->format('dmyhms') . '(' . $this->thumbnailWidth . 'x' . $this->thumbnailHeight .').' . $this->fileExtension;
			$this->fileNameInDir = $fileName;
			$this->thumbnailFileNameInDir = $thumbnailFileName;
			Image::make($this->file)->save($this->getUploadPath() . $this->fileNameInDir);
			Image::make($this->getUploadPath() . $this->fileNameInDir)->resize($this->thumbnailWidth, $this->thumbnailHeight)->save($this->getUploadPath() . $this->thumbnailFileNameInDir);
			return true;
		}
		public function getCompletePublicFilePath(){
			return $this->publicFilePath . $this->fileNameInDir;
		}
		public function getCompleteThumbnailPublicFilePath(){
			return $this->publicFilePath . $this->thumbnailFileNameInDir;
		}
		/**
		 * @return UploadedFile
		 */
		public function getFile()
		{
			return $this->file;
		}
		/**
		 * @return string
		 */
		public function getFileExtension()
		{
			return $this->fileExtension;
		}
		/**
		 * @return null|string
		 */
		public function getFileName()
		{
			return $this->fileName;
		}
		/**
		 * @return string
		 */
		public function getUploadPath()
		{
			return $this->uploadPath;
		}
		public function getThumbnailUploadPath()
		{
			return $this->uploadPath;
		}
		/**
		 * @return mixed
		 */
		public function getSize()
		{
			return $this->size;
		}
		/**
		 * @return mixed
		 */
		public function getMimeType()
		{
			return $this->mimeType;
		}
	}
?>
