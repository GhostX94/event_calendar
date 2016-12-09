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

  <body id="app">

    <v-full-calendar :events="fcEvents" lang="en"></v-full-calendar>


    {!! Html::script('js/app.min.js') !!}

    <script type="text/javascript">
        var demoEvents = [
            {
              id: 1,  
              title : 'Sunny Out of Office',
              start : '2016-11-25',
              end : '2016-11-27'
            }
        ]
        var apiUrl = null;
        var objectRow = null;
        var tableColumns = null;
        var fieldInitOrder = null;
        var token = null;
    </script>
    <style lang='scss'>
  .app{
    background-color: #c7e6fd;  
}
</style>
    {!! Html::script('js/crud.js') !!}
  </body>
</html>
