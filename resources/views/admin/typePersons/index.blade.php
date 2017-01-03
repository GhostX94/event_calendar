@extends('admin.content')

@push('styles-content')
{!! Html::style('css/vue-styles.css') !!}
@endpush

@section('title-content', 'Listing type persons')

@section('content')
<div id="app">
    <div class="row">
        <h1 class="pull-left">List for type persons</h1>
        <h1 class="pull-right">
            <a class="btn btn-primary pull-right" href="#" style="margin-top: -10px;margin-bottom: 5px"
            @click="modal('POST')">Add new</a>
        </h1>
    </div>
    <!--Include table for items type schools-->
    @include('admin.typePersons.table')

    <!--Modals-->
    @include('admin.typePersons.form')
    @include('admin.typePersons.show')
    @include('admin.typePersons.delete')
</div>
@endsection

@push('scripts-content')
    {!! Html::script('js/models/eventType/config.js') !!}
    <script type="text/javascript">
        var token = '{{ csrf_token() }}';
        var fieldInitOrder = 'id';
        var apiUrl = {
            store: "{{ route('api.typePersons.store') }}/",
            show: "{{ route('api.typePersons.show') }}/",
            update: "{{ route('api.typePersons.update') }}/",
            delete: "{{ route('api.typePersons.destroy') }}/"
        };
    </script>
    {!! Html::script('js/crud.js') !!}
    <script type="text/javascript">
        var vm = window.vm;
    </script>
@endpush
