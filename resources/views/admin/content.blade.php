@extends('layouts.main')

@section('title', 'Admin')

@push('styles')
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
	{!! Html::style('css/all.css') !!}
@endpush

@section('main-content')
@include('layouts.partials.admin._header')
<div class="container-fluid">
  <div class="row row-offcanvas row-offcanvas-left">
    <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
      <!--<div class="list-group">
        <a href="#" class="list-group-item active">Link</a>
        <a href="#" class="list-group-item">Link</a>
        <a href="#" class="list-group-item">Link</a>
        <a href="#" class="list-group-item">Link</a>
        <a href="#" class="list-group-item">Link</a>
        <a href="#" class="list-group-item">Link</a>
        <a href="#" class="list-group-item">Link</a>
        <a href="#" class="list-group-item">Link</a>
        <a href="#" class="list-group-item">Link</a>
        <a href="#" class="list-group-item">Link</a>
      </div>-->
      <div class="just-padding">

        <div class="list-group list-group-root well">

            <a href="#item-1" class="list-group-item" data-toggle="collapse">
              <i class="glyphicon glyphicon-chevron-right"></i>Item 1
            </a>
            <div class="list-group collapse" id="item-1">

            <a href="#item-1-1" class="list-group-item" data-toggle="collapse">
              <i class="glyphicon glyphicon-chevron-right"></i>Item 1.1
            </a>
            <div class="list-group collapse" id="item-1-1">
              <a href="#" class="list-group-item">Item 1.1.1</a>
              <a href="#" class="list-group-item">Item 1.1.2</a>
              <a href="#" class="list-group-item">Item 1.1.3</a>
            </div>

            <a href="#item-1-2" class="list-group-item" data-toggle="collapse">
              <i class="glyphicon glyphicon-chevron-right"></i>Item 1.2
            </a>
            <div class="list-group collapse" id="item-1-2">
              <a href="#" class="list-group-item">Item 1.2.1</a>
              <a href="#" class="list-group-item">Item 1.2.2</a>
              <a href="#" class="list-group-item">Item 1.2.3</a>
            </div>

            <a href="#item-1-3" class="list-group-item" data-toggle="collapse">
              <i class="glyphicon glyphicon-chevron-right"></i>Item 1.3
            </a>
            <div class="list-group collapse" id="item-1-3">
              <a href="#" class="list-group-item">Item 1.3.1</a>
              <a href="#" class="list-group-item">Item 1.3.2</a>
              <a href="#" class="list-group-item">Item 1.3.3</a>
            </div>
          </div>

          <a href="#item-2" class="list-group-item" data-toggle="collapse">
            <i class="glyphicon glyphicon-chevron-right"></i>Item 2
          </a>
          <div class="list-group collapse" id="item-2">

            <a href="#item-2-1" class="list-group-item" data-toggle="collapse">
              <i class="glyphicon glyphicon-chevron-right"></i>Item 2.1
            </a>
            <div class="list-group collapse" id="item-2-1">
              <a href="#" class="list-group-item">Item 2.1.1</a>
              <a href="#" class="list-group-item">Item 2.1.2</a>
              <a href="#" class="list-group-item">Item 2.1.3</a>
            </div>

            <a href="#item-2-2" class="list-group-item" data-toggle="collapse">
              <i class="glyphicon glyphicon-chevron-right"></i>Item 2.2
            </a>
            <div class="list-group collapse" id="item-2-2">
              <a href="#" class="list-group-item">Item 2.2.1</a>
              <a href="#" class="list-group-item">Item 2.2.2</a>
              <a href="#" class="list-group-item">Item 2.2.3</a>
            </div>

            <a href="#item-2-3" class="list-group-item" data-toggle="collapse">
              <i class="glyphicon glyphicon-chevron-right"></i>Item 2.3
            </a>
            <div class="list-group collapse" id="item-2-3">
              <a href="#" class="list-group-item">Item 2.3.1</a>
              <a href="#" class="list-group-item">Item 2.3.2</a>
              <a href="#" class="list-group-item">Item 2.3.3</a>
            </div>

          </div>


          <a href="#item-3" class="list-group-item" data-toggle="collapse">
            <i class="glyphicon glyphicon-chevron-right"></i>Item 3
          </a>
          <div class="list-group collapse" id="item-3">

            <a href="#item-3-1" class="list-group-item" data-toggle="collapse">
              <i class="glyphicon glyphicon-chevron-right"></i>Item 3.1
            </a>
            <div class="list-group collapse" id="item-3-1">
              <a href="#" class="list-group-item">Item 3.1.1</a>
              <a href="#" class="list-group-item">Item 3.1.2</a>
              <a href="#" class="list-group-item">Item 3.1.3</a>
            </div>

            <a href="#item-3-2" class="list-group-item" data-toggle="collapse">
              <i class="glyphicon glyphicon-chevron-right"></i>Item 3.2
            </a>
            <div class="list-group collapse" id="item-3-2">
              <a href="#" class="list-group-item">Item 3.2.1</a>
              <a href="#" class="list-group-item">Item 3.2.2</a>
              <a href="#" class="list-group-item">Item 3.2.3</a>
            </div>

            <a href="#item-3-3" class="list-group-item" data-toggle="collapse">
              <i class="glyphicon glyphicon-chevron-right"></i>Item 3.3
            </a>
            <div class="list-group collapse" id="item-3-3">
              <a href="#" class="list-group-item">Item 3.3.1</a>
              <a href="#" class="list-group-item">Item 3.3.2</a>
              <a href="#" class="list-group-item">Item 3.3.3</a>
            </div>

          </div>

        </div>

      </div>
    </div><!--/span-->
    <div class="col-xs-12 col-sm-9 content">
      <p class="pull-left">
        <button type="button" class="btn btn-primary btn-xs" data-toggle="offcanvas">
          <span class="glyphicon glyphicon-list"></span>
        </button>
      </p>

      <div class="text-center">
        <h1>@yield('title-content')</h1>
       
      </div>
     
      @yield('content')


    </div><!--/span-->
  </div><!--/row-->
</div><!-- /.container -->


@endsection


@push('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script>
  $(document).ready(function () {
    $('[data-toggle=offcanvas]').click(function () {
      if ($('.sidebar-offcanvas').css('background-color') == 'rgb(255, 255, 255)') {
        $('.list-group-item').attr('tabindex', '-1');
      } else {
        $('.list-group-item').attr('tabindex', '');
      }
      $('.row-offcanvas').toggleClass('active');
    });

    $('.list-group-item').on('click', function() {
      $('.glyphicon', this)
      .toggleClass('glyphicon-chevron-right')
      .toggleClass('glyphicon-chevron-down');
    });
  });
</script>
@endpush