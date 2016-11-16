<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">

    <title>vuetable - Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">-->
    {!! Html::style('css/app.min.css') !!}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css">

    <style>
        /* Move down content because we have a fixed navbar that is 50px tall */
        body {
          padding-top: 50px;
          padding-bottom: 20px;
          overflow-y: scroll;
        }
        ul.dropdown-menu li {
            margin-left: 20px;
        }
        .vuetable th.sortable:hover {
            color: #2185d0;
            cursor: pointer;
        }
        .vuetable-actions {
            width: 11%;
            padding: 12px 0px;
            text-align: center;
        }
        .vuetable-actions > button {
          padding: 3px 6px;
          margin-right: 4px;
        }
        .vuetable-pagination {
            margin: 0;
        }
        .vuetable-pagination .btn {
            margin: 2px;
        }
        .vuetable-pagination-info {
            float: left;
            margin-top: auto;
            margin-bottom: auto;
        }
        ul.pagination {
          margin: 0px;
        }
        .vuetable-pagination-component {
          float: right;
        }
        .vuetable-pagination-component li a {
            cursor: pointer;
        }
        [v-cloak] {
            display: none;
        }
        .highlight {
            background-color: yellow;
        }
        .vuetable-detail-row {
            height: 200px;
        }
        .detail-row {
            margin-left: 40px;
        }
        .expand-transition {
            transition: all .5s ease;
        }
        .expand-enter, .expand-leave {
            height: 0;
            opacity: 0;
        }
        /* Loading Animation: */
        .vuetable-wrapper {
            opacity: 1;
            position: relative;
            filter: alpha(opacity=100); /* IE8 and earlier */
        }
        .vuetable-wrapper.loading {
          opacity:0.4;
           transition: opacity .3s ease-in-out;
           -moz-transition: opacity .3s ease-in-out;
           -webkit-transition: opacity .3s ease-in-out;
        }
        .vuetable-wrapper.loading:after {
          position: absolute;
          content: '';
          top: 40%;
          left: 50%;
          margin: -30px 0 0 -30px;
          border-radius: 100%;
          -webkit-animation-fill-mode: both;
                  animation-fill-mode: both;
          border: 4px solid #000;
          height: 60px;
          width: 60px;
          background: transparent !important;
          display: inline-block;
          -webkit-animation: pulse 1s 0s ease-in-out infinite;
                  animation: pulse 1s 0s ease-in-out infinite;
        }
        @keyframes pulse {
          0% {
            -webkit-transform: scale(0.6);
                    transform: scale(0.6); }
          50% {
            -webkit-transform: scale(1);
                    transform: scale(1);
                 border-width: 12px; }
          100% {
            -webkit-transform: scale(0.6);
                    transform: scale(0.6); }
        }
    </style>
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Project name</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <form class="navbar-form navbar-right">
                    <div class="form-group">
                        <input type="text" placeholder="Email" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="password" placeholder="Password" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-success">Sign in</button>
                </form>
            </div><!--/.navbar-collapse -->
        </div>
    </nav>

    <div id="app" class="container">
      <!-- Example row of columns -->
        <h2 class="sub-header">List of Users</h2>
        <hr>
        <div class="row">
            <div class="col-md-7 form-inline">
                <div class="form-inline form-group">
                    <label>Search:</label>
                    <input v-model="searchFor" class="form-control" @keyup.enter="setFilter">
                    <button class="btn btn-primary" @click="setFilter">Go</button>
                    <button class="btn btn-default" @click="resetFilter">Reset</button>
                </div>
            </div>
            <div class="col-md-5">
                <div class="form-inline form-group pull-right">
                    <button class="btn btn-default" data-toggle="modal" data-target="#settingsModal">
                        <span class="glyphicon glyphicon-cog"></span> Settings
                    </button>
                </div>
            </div>
        </div>
        <div class="modal fade" id="settingsModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">Settings</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="multiSort"> Multisort (use Alt+Click)
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Pagination:</label>
                            <select class="form-control" v-model="paginationComponent">
                                <option value="vuetable-pagination">vuetable-pagination</option>
                                <option value="vuetable-pagination-dropdown">vuetable-pagination-dropdown</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Per Page:</label>
                            <select class="form-control" v-model="perPage">
                                <option value=10>10</option>
                                <option value=15>15</option>
                                <option value=20>20</option>
                                <option value=25>25</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title">Visible fields</h4>
                                </div>
                                <div class="panel-body">
                                    <div class="checkbox" v-for="field in fields">
                                        <label>
                                            <input type="checkbox" v-model="field.visible">
                                            @{{ field.title == '' ? field.name.replace('__', '') : field.title | capitalize }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-responsive">
            <vuetable v-ref:vuetable
                api-url="http://vuetable.ratiw.net/api/users"
                pagination-path=""
                :fields="fields"
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
        <hr>

        <footer>
            <p>&copy; 2016 Company, Inc.</p>
        </footer>

    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment-with-locales.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.24/vue.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue-resource/1.0.2/vue-resource.min.js"></script>
    <script type="text/javascript" src="http://cdn.jsdelivr.net/vue.table/1.5.3/vue-table.min.js">
    </script>--> 
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>-->   
    {!! Html::script('js/app.min.js') !!}

     <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment-with-locales.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>

    <script>

    // fields definition
    var tableColumns = [
        {
            name: 'id',
            title: '',
            dataClass: 'text-center',
            callback: 'showDetailRow'
        },
        {
            name: 'name',
            sortField: 'name',
        },
        {
            name: 'email',
            sortField: 'email',
        },
        {
            name: 'nickname',
            sortField: 'nickname',
            callback: 'allCap'
        },
        {
            name: 'birthdate',
            sortField: 'birthdate',
            //callback: 'formatDate|D/MM/Y'
        },
        {
            name: 'gender',
            sortField: 'gender',
            titleClass: 'text-center',
            dataClass: 'text-center',
            callback: 'gender'
        },
        /*{
            name: 'address',
            sortField: 'address',
            callback: 'address',
        },*/
        {
            name: '__component:custom-action',
            title: "Component",
            titleClass: 'center aligned',
            dataClass: 'custom-action center aligned',
        },
        {
            name: '__actions',
            dataClass: 'text-center',
        }
    ]

    var info = "Hola";

    /*var mixin = {
      methods: {
        address: function (value) {
            console.log('direction jajajj puta');
            return value.line1;
        }
      }
    }*/

    </script>
    {!! Html::script('js/crud.js') !!}
  </body>
</html>
