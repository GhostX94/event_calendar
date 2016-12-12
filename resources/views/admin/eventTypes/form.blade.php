@extends('layouts.modal.form')

@section('modal-form-title')
Form Event Type
@stop

@section('modal-form-content')
	@include('admin.eventTypes.fields')
@stop