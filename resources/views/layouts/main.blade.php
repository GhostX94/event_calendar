<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>@yield('title')</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
  	{!! Html::style('css/app.min.css') !!}
	@stack('styles')
</head>
<body>
	@yield('main-content')

	{!! Html::script('js/app.min.js') !!}
	@stack("scripts")
</body>
</html>