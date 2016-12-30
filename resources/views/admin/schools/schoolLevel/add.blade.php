<?php
	extract([
            'modalTitle'    => 'New level',
            'modalSync'     => 'schoolLevel_ADD_inform',
            'modalClose'    => 'schoolLevel_ADD_inform',
            'model'         => 'School_level',
            'type'			=> 'store',
            'content'       => view('admin.schools.schoolLevel.fields')
	]);
?>

@include('layouts.modal.relation-form')