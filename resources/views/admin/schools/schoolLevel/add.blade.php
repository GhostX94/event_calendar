<?php
	extract([
            'modalTitle'    => 'New level',
            'modalSync'     => 'school_level_ADD_inform',
            'modalClose'    => 'school_level_ADD_inform',
            'model'         => 'School_level',
            'type'			=> 'store',
            'content'       => view('admin.schools.schoolLevel.fields')
	]);
?>

@include('layouts.modal.relation-form')