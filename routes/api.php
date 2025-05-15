<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\EmailTestController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\CommentController;


Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ResetPasswordController::class, 'reset']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/categories', [CategoriesController::class, 'index']);
Route::post('/categories', [CategoriesController::class, 'store']);
Route::put('/categories/{id}', [CategoriesController::class, 'update']);
Route::delete('/categories/{id}', [CategoriesController::class, 'destroy']);

Route::get('/messages', [MessagesController::class, 'index']); // Menampilkan semua pesan
Route::post('/messages', [MessagesController::class, 'store']); // Mengirim pesan
Route::get('/messages/{id}', [MessagesController::class, 'show']); // Menampilkan pesan berdasarkan ID
Route::delete('/messages/{id}', [MessagesController::class, 'destroy']);


Route::get('/auth', [SocialiteController::class, 'getGoogleRedirectUrl']);
Route::get('/auth/google/redirect', [SocialiteController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);

Route::middleware('auth:sanctum')->post('/comments', [CommentController::class, 'store']);
Route::get('/comments/{slug}', [CommentController::class, 'getComments']);