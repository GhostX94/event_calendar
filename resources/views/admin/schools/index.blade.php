@extends('admin.content')

@push('styles-content')
{!! Html::style('css/vue-styles.css') !!}
@endpush

@section('title-content', 'List of schools')

@section('content')
<div id="app">
    <div class="row">
        <h1 class="pull-left">Almacen</h1>
        <h1 class="pull-right">
            <a class="btn btn-primary pull-right" href="#" style="margin-top: -10px;margin-bottom: 5px">Añadir nuevo</a>
        </h1>
    </div>
    <!--Include table for items type schools-->
    @include('admin.schools.table')

    <!--Modals-->
    @include('admin.schools.form')
    @include('admin.schools.show')

</div>
@endsection

@push('scripts-content')
    {!! Html::script('js/models/school/config.js') !!}
    <script type="text/javascript">
        var token = '{{ csrf_token() }}';
        var fieldInitOrder = 'id';
        var apiUrl = {
            show: "{{ route('api.schools.show') }}/"
        };
    </script>
    {!! Html::script('js/crud.js') !!}
@endpush
