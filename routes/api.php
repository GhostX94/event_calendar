<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::get('/testApi', function(){
	echo "Api";
});

Route::group(['prefix' => 'admin'], function () 
{	

	/* 
	 * ------------------- Route index for Schools ---------------
	 */
	Route::group(['prefix' => 'schools'], function()
	{
		Route::get('/',[
				'as' => 'api.schools.index',
				'uses' => 'SchoolController@index'
		]);

		Route::get('show/{id?}', [
			'as' => 'api.schools.show',
			'uses' => 'SchoolController@show'
		]);

		Route::patch('update/{id?}', [
			'as' => 'api.schools.update',
			'uses' => 'SchoolController@update'
		]);

		Route::post('store', [
			'as' => 'api.schools.store',
			'uses' => 'SchoolController@store'
		]);

		Route::delete('delete/{id?}', [
			'as' => 'api.schools.destroy',
			'uses' => 'SchoolController@destroy'
		]);

	});

});
