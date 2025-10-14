<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PersonController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\AuthController;

Route::prefix('v1')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::get('people', [PersonController::class,'index']);
    Route::get('people/{person}', [PersonController::class,'show']);

    Route::middleware('auth:sanctum')->group(function() {
        Route::post('people/{person}/like', [LikeController::class,'like']);
        Route::post('people/{person}/dislike', [LikeController::class,'dislike']);
        Route::get('likes/people', [LikeController::class,'likedPeople']);
        Route::post('logout', [AuthController::class,'logout']);
    });
});
