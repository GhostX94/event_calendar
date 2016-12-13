@extends('layouts.modal.form')

@section('modal-form-title')
Form Schools
@stop

@section('modal-form-content')
	@include('admin.schools.fields')
@stop