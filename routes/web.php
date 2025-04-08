<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);
Route::put('/api/users/{id}', [AuthController::class, 'updateUser']);
Route::post('/users/{id}/profile-image', [AuthController::class, 'uploadProfileImage']);



Route::get('/', function () {
    return view('welcome');
});

Route::get('/{pathMatch}', function () {
    return view('welcome');
})->where('pathMatch', '.*');