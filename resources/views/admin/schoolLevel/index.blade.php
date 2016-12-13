@extends('admin.content')

@push('styles-content')
{!! Html::style('css/vue-styles.css') !!}
@endpush

@section('title-content', 'Listing of schools levels')

@section('content')
<div id="app">
    <div class="row">
        <h1 class="pull-left">List of schools levels</h1>
        <h1 class="pull-right">
            <a class="btn btn-primary pull-right" href="#" style="margin-top: -10px;margin-bottom: 5px"
            @click="modal('POST')">Add new</a>
        </h1>
    </div>
    <!--Include table for items type schools-->
    @include('admin.schoolLevel.table')

    <!--Modals-->
    @include('admin.schoolLevel.form')
    @include('admin.schoolLevel.show')
    @include('admin.schoolLevel.delete')
</div>
@endsection

@push('scripts-content')
    {!! Html::script('js/models/schoolLevel/config.js') !!}
    <script type="text/javascript">
        var token = '{{ csrf_token() }}';
        var fieldInitOrder = 'id';
        var apiUrl = {
            store: "{{ route('api.schoolLevels.store') }}/",
            show: "{{ route('api.schoolLevels.show') }}/",
            update: "{{ route('api.schoolLevels.update') }}/",
            delete: "{{ route('api.schoolLevels.destroy') }}/"
        };
    </script>
    {!! Html::script('js/crud.js') !!}
    <script type="text/javascript">
        var vm = window.vm;
    </script>
@endpush
