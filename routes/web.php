<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\EmailTestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\MessagesController;
use Laravel\Socialite\Facades\Socialite;    
use App\Http\Controllers\SocialiteController;

// Auth
Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);

//Update User
Route::put('/api/users/{id}', [AuthController::class, 'updateUser']);
Route::post('/users/{id}/profile-image', [AuthController::class, 'uploadProfileImage']);

//Reset Password
Route::post('/api/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/api/reset-password', [ResetPasswordController::class, 'reset']);

//categories
Route::get('/api/categories', [CategoriesController::class, 'index']);
Route::get('/api/categories/{id}', [CategoriesController::class, 'show']);
Route::post('/api/categories', [CategoriesController::class, 'store']);
Route::post('/api/categories/{id}', [CategoriesController::class, 'update']);
Route::delete('/api/categories/{id}', [CategoriesController::class, 'destroy']);

//messages
Route::get('/api/messages', [MessagesController::class, 'index']);
Route::get('/api/messages/{id}', [MessagesController::class, 'show']);
Route::post('/api/messages', [MessagesController::class, 'store']);
Route::delete('/api/messages/{id}', [MessagesController::class, 'destroy']);


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



Route::get('/{pathMatch}', function () {
    return view('welcome');
})->where('pathMatch', '.*');

Route::get('/test-email', [EmailTestController::class, 'sendTestEmail']);

Route::get('/api/auth/google/redirect', [SocialiteController::class, 'redirectToGoogle']);
Route::get('/api/auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);