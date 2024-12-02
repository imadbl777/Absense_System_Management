<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminNotificationController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\JustificationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfessorsController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;


Broadcast::routes(['prefix' => 'api', 'middleware' => ['auth:sanctum']]);


Route::post('/student/login', [StudentsController::class, 'login']);
Route::post('/admin/login', [AdminController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/student/profile', [StudentsController::class, 'getProfile']);
    Route::get('/student/details', [StudentsController::class, 'getStudentDetails']);


    Route::get('/absent-sessions', [JustificationController::class, 'getAbsentSessions']);
    Route::post('/justifications', [JustificationController::class, 'store']);
    Route::get('/my-justifications', [JustificationController::class, 'getMyJustifications']);
    Route::get('/justifications/{id}/download', [JustificationController::class, 'downloadDocument']);


    Route::middleware(['is.admin'])->group(function () {

        Route::get('/justifications', [JustificationController::class, 'index']);
        Route::post('/justifications/{id}/review', [JustificationController::class, 'review']);


        Route::get('/admin/getStatistics', [AdminController::class, 'getStatistics']);
        Route::get('/admin/details', [AdminController::class, 'getProfile']);


        Route::get('/branches', [GroupsController::class, 'getBranches']);
        Route::get('/groups', [GroupsController::class, 'getGroups']);
        Route::get('/students', [GroupsController::class, 'getStudents']);

        Route::get('/admin/notifications', [AdminNotificationController::class, 'index']);
        Route::put('/admin/notifications/{id}/read', [AdminNotificationController::class, 'markAsRead']);
        Route::post('/admin/notifications/mark-all-read', [AdminNotificationController::class, 'markAllAsRead']);


        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    });
    Route::post('messages', [JustificationController::class, 'message']);
});