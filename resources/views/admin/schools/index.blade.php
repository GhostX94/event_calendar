@extends('admin.content')

@push('styles-content')
{!! Html::style('css/vue-styles.css') !!}
@endpush

@section('title-content', 'Listing of schools')

@section('content')
<div id="app">
    <div class="row">
        <h1 class="pull-left">List of schools</h1>
        <h1 class="pull-right">
            <a class="btn btn-primary pull-right" href="#" style="margin-top: -10px;margin-bottom: 5px"
            @click="modal('POST')">Add new</a>
        </h1>
    </div>
    <!--Include table for items type schools-->
    @include('admin.schools.table')

    {{--Modals--}}
    @include('admin.schools.form')
    @include('admin.schools.show')
    @include('admin.schools.delete')

    {{-- Modals relations --}}
    @include('admin.schools.schoolLevel.add')


</div>
@endsection

@push('scripts-content')
    {!! Html::script('js/models/school/config.js') !!}
    <script type="text/javascript">
        var token = '{{ csrf_token() }}';
        var fieldInitOrder = 'id';
        var apiUrl = {
            store: "{{ route('api.schools.store') }}/",
            show: "{{ route('api.schools.show') }}/",
            update: "{{ route('api.schools.update') }}/",
            delete: "{{ route('api.schools.destroy') }}/",
            foreign :{
                school_level:{
                    select:{
                        method: 'GET',
                        url: "{{ route('api.schoolLevels.select-list') }}/",
                    },
                    store:{
                        method: 'POST',
                        url: "{{ route('api.schoolLevels.store') }}/"
                    } 
                }
            }
        };
    </script>
    {!! Html::script('js/crud.js') !!}
    <script type="text/javascript">
        var vm = window.vm;
        var loadSchoolLevels = function() {
            vm.getForeignData(vm.url.foreign.school_level.select.url, 'schoolLevelOptions', 'school_level', 'select');
        }

        vm.$watch('formModal', function (value) {
            if (value) {
                loadSchoolLevels();
            }
        })

        /**
        * Load school levels list after add new school level from add new school form
        */
        vm.$watch('localModals.schoolLevel_ADD_inform', function (value) {
            if ( !value ) {
                loadSchoolLevels();
            }
        });
          


    </script>
@endpush
