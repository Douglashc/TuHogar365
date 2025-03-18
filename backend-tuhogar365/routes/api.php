<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExcelController;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('token', [App\Http\Controllers\Api\AuthController::class, 'login'])->name('api.login');

Route::group(['middleware' => 'auth:api'], function () {
    // Route::post('users/change-password', [App\Http\Controllers\Api\AuthController::class, 'updatePassword']);
    Route::get('logout', [App\Http\Controllers\Api\AuthController::class, 'logout']);
});

Route::middleware('auth:api')->post('/broadcasting/auth', function (Request $request) {
    \Log::info('Broadcasting auth route hit');
    return Broadcast::auth($request);
});
 
Route::get('users/roles', [App\Http\Controllers\UserController::class, 'roles']);

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('users/habilitar/{id}', [App\Http\Controllers\UserController::class, 'habilitar']);

    Route::get('clientes/habilitados/{id}', [App\Http\Controllers\ClienteController::class, 'habilitados']);
    Route::get('clientes/habilitar/{id}', [App\Http\Controllers\ClienteController::class, 'habilitar']);

    Route::get('notificaciones/leernotificacion/{id}', [App\Http\Controllers\NotificacionController::class, 'leerNotificacion']);

    Route::get('servicios/habilitados', [App\Http\Controllers\ServicioController::class, 'habilitados']);
    Route::get('servicios/habilitar/{id}', [App\Http\Controllers\ServicioController::class, 'habilitar']);

    // Tu ruta de broadcasting de Pusher
    Route::post('/broadcasting/auth', function (Request $request) {
        \Log::info('ENTRO AL POST: ', ['request' => $request->all()]);
    
        // Verificamos si Laravel reconoce al usuario autenticado
        $user = auth()->user();
        if (!$user) {
            \Log::error('❌ Usuario no autenticado en broadcasting/auth');
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    
        \Log::info('✅ Usuario autenticado en broadcasting/auth', ['user_id' => $user->id]);
    
        return Broadcast::auth($request);
    });
    

    Route::apiResources([
        'users' => App\Http\Controllers\UserController::class,
        'tareas' => App\Http\Controllers\TareaController::class,
        'notificaciones' => App\Http\Controllers\NotificacionController::class,
        'clientes' => App\Http\Controllers\ClienteController::class,
        'servicios' => App\Http\Controllers\ServicioController::class,
        'reservas' => App\Http\Controllers\ReservaController::class,
        'periodos' => App\Http\Controllers\PeriodoController::class,
    ]);
});
