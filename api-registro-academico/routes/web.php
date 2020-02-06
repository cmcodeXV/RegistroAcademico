<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Cargando clase
use App\Http\Middleware\ApiAuthMiddleware;
Route::get('/', function () {
    return view('welcome');
});

//Rutas de pruebas
    /*
    Route::get('/test-orm','pruebaController@testOrm');
    Route::get('/user/prueba','UserController@pruebas');
    Route::get('/matricula/prueba','MatriculaController@pruebas');
    */

//Rutas de Usuario
    Route::resource('/api/user','UserController');
    Route::post('/api/user/upload',"UserController@upload")->middleware(ApiAuthMiddleware::class);
    Route::get('/api/user/image/{filename}', 'UserController@getImage');
    Route::post('/api/user/login','UserController@login');

//Rutas de Docente
    Route::resource('/api/docente', 'DocenteController');

//Rutas de Estudiante
    Route::resource('/api/estudiante', 'EstudianteController');

//Rutas de Materia
    Route::resource('/api/materia', 'MateriaController');

//Rutas de Materia
    Route::resource('/api/matricula', 'MatriculaController');