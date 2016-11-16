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
    <div class="row">
        <div class="col-md-5 form-inline">
            <div class="form-inline form-group">
                <label>Search:</label>
                <input v-model="searchFor" class="form-control" @keyup.enter="setFilter">
                <button class="btn btn-primary" @click="setFilter">Go</button>
                <button class="btn btn-default" @click="resetFilter">Reset</button>
            </div>
        </div>
        <div class="col-md-7">
            <div class="dropdown form-inline pull-right">
                <label>pagination-style</label>
                <select class="form-control" v-model="paginationComponent">
                <option value="vuetable-pagination-simple">Simple</option>
                    <option value="vuetable-pagination-bootstrap">Detail</option>
                    <option value="vuetable-pagination-dropdown">Dropdown</option>
                </select>
                <label>items per page</label>
                <select class="form-control" v-model="perPage">
                    <option value=10>10</option>
                    <option value=15>15</option>
                    <option value=20>20</option>
                    <option value=25>25</option>
                </select>
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <i class="glyphicon glyphicon-cog"></i>
                </button>
                <ul class="dropdown-menu">
                    <li v-for="field in columns">
                        <span class="checkbox">
                            <label>
                                <input type="checkbox" v-model="field.visible">
                                @{{ field.title == '' ? field.name.replace('__', '') : field.title | capitalize }}
                            </label>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="table-responsive">
        <vuetable v-ref:vuetable
        api-url="{{ route('api.schools.index') }}"
        pagination-path=""
        :fields="columns"
        :sort-order="sortOrder"
        :multi-sort="multiSort"
        table-class="table table-bordered table-striped table-hover"
        ascending-icon="glyphicon glyphicon-chevron-up"
        descending-icon="glyphicon glyphicon-chevron-down"
        pagination-class=""
        pagination-info-class=""
        pagination-component-class=""
        :pagination-component="paginationComponent"
        :item-actions="itemActions"
        :append-params="moreParams"
        :per-page="perPage"
        wrapper-class="vuetable-wrapper"
        table-wrapper=".vuetable-wrapper"
        loading-class="loading"
        detail-row-component="my-detail-row"
        detail-row-id="id"
        detail-row-transition="expand"
        row-class-callback="rowClassCB"
        ></vuetable>
    </div>
</div>
@endsection

@push('scripts-content')
    {!! Html::script('js/models/school/config.js') !!}
    <script type="text/javascript">
        var fieldInitOrder = 'id';
    </script>
    {!! Html::script('js/crud.js') !!}
@endpush
