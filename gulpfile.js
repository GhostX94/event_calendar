const elixir = require('laravel-elixir');
elixir.config.sourcemaps = false;
require('laravel-elixir-browserify-official');
require('laravel-elixir-vueify');

//require('laravel-elixir-vue');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    /*mix.sass('app.scss')
       .webpack('app.js');*/
       
    mix.styles(['styles.css'], 'public/css/styles.css');
    mix.styles(['vue-styles.css'], 'public/css/vue-styles.css');
    mix.styles([
    	'bootstrap/3.3.7/bootstrap.min.css',
    	'font-awesome/4.5.0/font-awesome.min.css'
    	], 
    	'public/css/app.min.css');

    mix.scripts([
        'jquery/3.1.0/jquery-3.1.0.min.js', 
    	'bootstrap/3.3.7/bootstrap.min.js'      
    ], 'public/js/app.min.js');


    mix.browserify('crud.js', 'public/js/crud.js');

   	mix.scripts(['models/school/config.js'], 'public/js/models/school/config.js')


});
