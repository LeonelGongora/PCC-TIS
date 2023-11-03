<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\EventTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\EventoUserController;
use App\Http\Controllers\ArchivoController;
use App\Http\Controllers\EventoAbiertoController;
use App\Http\Controllers\EventoCerradoController;
use App\Http\Controllers\EstaRegUserEventController;
use App\Http\Controllers\OrganizerController;
use App\Http\Controllers\SponsorController;
use App\Http\Controllers\AttributeController;

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
Route::get('type-events', [EventTypeController::class, 'get']);
Route::get('events', [EventController::class, 'get']);

Route::post('/add-event', [EventController::class, 'store']);
Route::post('/add-attribute', [AttributeController::class, 'store']);
Route::post('/update-event/{id}', [EventController::class, 'update']);
Route::post('/add-organizador', [OrganizerController::class, 'store']);
Route::post('/add-patrocinador', [SponsorController::class, 'store']);
Route::post('/add-event_type', [EventTypeController::class, 'store']);
Route::post('/add-user-information', [UserController::class, 'store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::resource('eventos', EventController::class);
Route::resource('eventousuarios', EventoUserController::class);


Route::post('upload', [ArchivoController::class, 'upload']);

Route::resource('usuarios', UserController::class);
Route::post('download', [ArchivoController::class, 'download']);
Route::resource('eventoabiertos', EventoAbiertoController::class);
Route::resource('eventocerrados', EventoCerradoController::class);
Route::resource('estareguserevent', EstaRegUserEventController::class);
