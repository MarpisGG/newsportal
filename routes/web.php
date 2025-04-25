<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\EmailTestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\CategoriesController;


Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);
Route::put('/api/users/{id}', [AuthController::class, 'updateUser']);
Route::post('/users/{id}/profile-image', [AuthController::class, 'uploadProfileImage']);
Route::post('/api/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/api/reset-password', [ResetPasswordController::class, 'reset']);
Route::get('/api/categories', [CategoriesController::class, 'index']);
Route::get('/api/categories/{id}', [CategoriesController::class, 'show']);

Route::get('/', function () {
    return view('welcome');
});

Route::get('/{pathMatch}', function () {
    return view('welcome');
})->where('pathMatch', '.*');

Route::get('/reset-password/{token}', function ($token) {
    // redirect ke frontend reset page
    return redirect("http://127.0.0.1:8000/reset-password/$token");
})->name('password.reset');

Route::get('/test-email', [EmailTestController::class, 'sendTestEmail']);
