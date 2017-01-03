@extends('admin.content')

@push('styles-content')
{!! Html::style('css/vue-styles.css') !!}
@endpush

@section('title-content', 'Listing event targets')

@section('content')
<div id="app">
    <div class="row">
        <h1 class="pull-left">List for event targets</h1>
        <h1 class="pull-right">
            <a class="btn btn-primary pull-right" href="#" style="margin-top: -10px;margin-bottom: 5px"
            @click="modal('POST')">Add new</a>
        </h1>
    </div>
    <!--Include table for items type schools-->
    @include('admin.eventTargets.table')

    <!--Modals-->
    @include('admin.eventTargets.form')
    @include('admin.eventTargets.show')
    @include('admin.eventTargets.delete')
</div>
@endsection

@push('scripts-content')
    {!! Html::script('js/models/eventType/config.js') !!}
    <script type="text/javascript">
        var token = '{{ csrf_token() }}';
        var fieldInitOrder = 'id';
        var apiUrl = {
            store: "{{ route('api.eventTargets.store') }}/",
            show: "{{ route('api.eventTargets.show') }}/",
            update: "{{ route('api.eventTargets.update') }}/",
            delete: "{{ route('api.eventTargets.destroy') }}/"
        };
    </script>
    {!! Html::script('js/crud.js') !!}
    <script type="text/javascript">
        var vm = window.vm;
    </script>
@endpush
