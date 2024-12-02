<?php

use Illuminate\Support\Facades\Route;
use BeyondCode\LaravelWebSockets\Facades\WebSocketsRouter;
use BeyondCode\LaravelWebSockets\WebSockets\WebSocketHandler;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
// web.php




WebSocketsRouter::webSocket('/app/{appKey}',WebSocketHandler::class);

Route::get('/laravel-websockets', function () {
    return view('dashboard');
});