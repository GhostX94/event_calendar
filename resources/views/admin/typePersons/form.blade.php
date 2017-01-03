@extends('layouts.modal.form')

@section('modal-form-title')
Form Type person
@stop

@section('modal-form-content')
	@include('admin.typePersons.fields')
@stop