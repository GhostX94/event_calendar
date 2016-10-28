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
       
    mix.styles(['styles.css']);

    mix.browserify('app.js', 'public/js/app.js');
});
