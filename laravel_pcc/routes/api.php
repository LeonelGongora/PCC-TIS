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
use App\Http\Controllers\EventUser2Controller;
use App\Http\Controllers\EventUser3Controller;
use App\Http\Controllers\RequirementController;
use App\Http\Controllers\Event_OrganizerController;
use App\Http\Controllers\Event_SponsorController;
use App\Http\Controllers\TipoController;
use App\Http\Controllers\TipoUserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Team_UserController;
use App\Http\Controllers\Tipo1Controller;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\NotificationUserController;
use App\Http\Controllers\EventNotificationController;
use App\Http\Controllers\NotificationTeamController;

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
Route::post('/add-attribute', [AttributeController::class, 'store']);
Route::delete('/delete-attribute/{id}', [AttributeController::class, 'destroy']);

Route::post('/add-activity', [ActivityController::class, 'store']);
Route::delete('/delete-activity/{id}', [ActivityController::class, 'destroy']);

Route::get('type-events', [EventTypeController::class, 'get']);
Route::post('/add-event_type', [EventTypeController::class, 'store']);

Route::get('events', [EventController::class, 'get']);
Route::post('/add-event', [EventController::class, 'store']);
Route::post('/update-event/{id}', [EventController::class, 'update']);
Route::get('/register-to-events/{id}', [EventController::class, 'getNo']);

Route::post('/add-event_organizer', [Event_OrganizerController::class, 'store']);
Route::post('/delete-event_organizer', [Event_OrganizerController::class, 'destroy']);

Route::post('/add-event_sponsor', [Event_SponsorController::class, 'store']);
Route::post('/delete-event_sponsor', [Event_SponsorController::class, 'destroy']);

Route::post('/add-notice', [NoticeController::class, 'store']);

Route::post('/add-organizador', [OrganizerController::class, 'store']);
Route::get('/get-organizador', [OrganizerController::class, 'get']);
Route::delete('/delete-organizador/{id}', [OrganizerController::class, 'destroy']);

Route::post('/add-patrocinador', [SponsorController::class, 'store']);
Route::get('/get-patrocinador', [SponsorController::class, 'get']);
Route::delete('/delete-patrocinador/{id}', [SponsorController::class, 'destroy']);

Route::post('/add-requirement', [RequirementController::class, 'store']);

Route::post('/add-user-information', [UserController::class, 'store']);
Route::get('/get-user-information', [UserController::class, 'get']);
Route::get('/get-user-by-dni/{numero_documento}', [UserController::class, 'getIdbyDNI']);
Route::get('/get-user-1/{event_id}', [UserController::class, 'getUser1']);

Route::post('/add-team', [TeamController::class, 'store']);
Route::get('/get-team-0/{event_id}', [TeamController::class, 'getTeams0']);
Route::get('/get-team-1/{event_id}', [TeamController::class, 'getTeams1']);

Route::post('/add-team_user', [Team_UserController::class, 'store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//delete-attribute

Route::resource('eventos', EventController::class);
Route::resource('eventousuarios', EventoUserController::class);


Route::post('upload', [ArchivoController::class, 'upload']);

Route::resource('usuarios', UserController::class);
Route::post('download', [ArchivoController::class, 'download']);
Route::resource('eventoabiertos', EventoAbiertoController::class);
Route::resource('eventocerrados', EventoCerradoController::class);

Route::resource('estareguserevent', EstaRegUserEventController::class);
Route::resource('eventuser2', EventUser2Controller::class);
Route::resource('eventuser3', EventUser3Controller::class);
Route::resource('tipos', TipoController::class);
Route::resource('tipousers', TipoUserController::class);
Route::resource('login', LoginController::class);
Route::resource('tipos1', Tipo1Controller::class);
Route::get('/miseventos/{id}', [EventController::class, 'misEventos']);
Route::resource('notifications', NotificationController::class);
Route::resource('notificationusers', NotificationUserController::class);
Route::resource('eventnotifications', EventNotificationController::class);
Route::get('/getporevento/{id}', [TeamController::class, 'getPorEvento']);
Route::resource('teams', TeamController::class);
Route::resource('notificationteams', NotificationTeamController::class);
