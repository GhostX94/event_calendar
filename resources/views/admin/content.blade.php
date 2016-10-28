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
        <h1>Bootstrap forms</h1>
        <p class="lead">Example of a form with 3 columns and labels aligned to the left of the 
          fields at &gt; 1200px (large) screen sizes, 2 columns and labels aligned to the left of the 
          fields at &gt;992px (medium) screen sizes, 2 columns labels above fields at &gt; 768px (small), and single 
          column at &lt; 768px (Extra small). 
        </p>
      </div>
      <form class="form-horizontal" role="form">
        <div class="row">
          <div class="col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="inputEmail" class="col-md-4 control-label">Email:</label>
              <div class="col-md-8">
                <input class="form-control" id="inputEmail" placeholder="Email" type="email">
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="inputPassword" class="col-md-4 control-label">Password:</label>
              <div class="col-md-8">
                <input class="form-control" id="inputPassword" placeholder="Password" type="password">
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="inputLabel3" class="col-md-4 control-label">Label 3:</label>
              <div class="col-md-8">
                <input class="form-control" id="inputLabel3" placeholder="Label 3" type="text">
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="inputLabel4" class="col-md-4 control-label">Label 4:</label>
              <div class="col-md-8">
                <input class="form-control" id="inputLabel4" placeholder="Label 4" type="text">
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="input5" class="col-md-4 control-label">1234567890:</label>
              <div class="col-md-8">
                <input class="form-control" id="input5" placeholder="input 5" type="text">
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="input6" class="col-md-4 control-label">123456789012:</label>
              <div class="col-md-8">
                <input class="form-control" id="input6" placeholder="input 6" type="text">
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="input7" class="col-md-4 control-label">12345678901234:</label>
              <div class="col-md-8">
                <input class="form-control" id="input7" placeholder="input 7" type="text">
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="input8" class="col-md-4 control-label">1234567890123456:</label>
              <div class="col-md-8">
                <input class="form-control" id="input8" placeholder="input 8" type="text">
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="input9" class="col-md-4 control-label">123456789012345678:</label>
              <div class="col-md-8">
                <input class="form-control" id="input9" placeholder="input 9" type="text">
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4">
            <div class="form-group">
              <label for="input10" class="col-md-4 control-label">12345678901234567890:</label>
              <div class="col-md-8">
                <input class="form-control" id="input10" placeholder="input 10" type="text">
              </div>
            </div>
          </div>
        </div><!-- /.row this actually does not appear to be needed with the form-horizontal -->
      </form>
      <p>Note: label text will occupy as much space as the text takes regardless of the 
        column size, so be sure to validate your spacing.
      </p>
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