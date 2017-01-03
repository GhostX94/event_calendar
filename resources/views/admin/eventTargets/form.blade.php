@extends('layouts.modal.form')

@section('modal-form-title')
Form Event Target
@stop

@section('modal-form-content')
	@include('admin.eventTargets.fields')
@stop