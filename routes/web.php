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

Auth::routes();
// Authentication Routes...
/*Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');*/
//Route::get('/home', 'HomeController@index');


Route::get('/', function () {
    return view('fullcalendar');
});


Route::group(['prefix' => 'admin', 'middleware' => ['auth']], 
	function (){
	Route::get('/dashboard', function () {
	    	return view('admin.content');
	});
}); 




Route::group(['prefix' => 'admin', 'middleware' => ['role:admin']], function () {	

	
	/* 
	 * ------------------- Route for Schools ---------------
	 */
	Route::group(['prefix' => 'schools'], function(){

		Route::get('',[
				'as' => 'schools.index',
				'uses' => function(){
					return view('admin.schools.index');
				}
		]);
	});

	/* 
	 * ------------------- Route for EvenTypes ---------------
	 */
	Route::group(['prefix' => 'eventTypes'], function(){

		Route::get('',[
				'as' => 'eventTypes.index',
				'uses' => function(){
					return view('admin.eventTypes.index');
				}
		]);
	});

	/* 
	 * ------------------- Route for EvenTypes ---------------
	 */
	Route::group(['prefix' => 'schoolLevels'], function(){

		Route::get('',[
				'as' => 'schoolLevels.index',
				'uses' => function(){
					return view('admin.schoolLevels.index');
				}
		]);
	});


	/* 
	 * ------------------- Route for EvenTargets ---------------
	 */
	Route::group(['prefix' => 'eventTargets'], function(){

		Route::get('',[
				'as' => 'eventTargets.index',
				'uses' => function(){
					return view('admin.eventTargets.index');
				}
		]);
	});

	/* 
	 * ------------------- Route for EvenTargets ---------------
	 */
	Route::group(['prefix' => 'typePersons'], function(){

		Route::get('',[
				'as' => 'typePersons.index',
				'uses' => function(){
					return view('admin.typePersons.index');
				}
		]);
	});


});




