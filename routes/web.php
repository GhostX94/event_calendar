<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('table');
});




Route::group(['prefix' => 'admin'], function () {	

	Route::get('/dashboard', function () {
    	return view('admin.content');
	});

	/* 
	 * ------------------- Route index for Schools ---------------
	 */
	Route::group(['prefix' => 'schools'], function(){

	Route::get('',[
			'as' => 'schools.index',
			'uses' => function(){
				return view('admin.schools.index');
			}
		]);
	});


});



